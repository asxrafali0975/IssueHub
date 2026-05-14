from fastapi import APIRouter, HTTPException, Request, status, Depends, Response
from core.database import User_collection
from schemas.UserModel import User , OTP_Model
from core.security import token_generator_func , hash_password_func , check_password_func
from services.redis import _redis
from services.utils import role_gen_func , generate_otp , redis_set_func , cookie_set
from services.background_task import send_email



auth_router = APIRouter()


OTP_EXPIRY = 5*60 # 5 minutes 
SESSION_EXPIRY = 24 * 60 * 60 #one day 

        

@auth_router.post("/SignUp", status_code=status.HTTP_201_CREATED)
async def RegisterRoute(usr: User,response: Response):
    try:

        user_data = usr.model_dump()
        email = user_data["email"]
        password = user_data["password"]
        role =role_gen_func(email)
        user_exists = await User_collection.find_one({"email": email})

        if user_exists:
            raise HTTPException(status_code=409, detail="Email Already Registered")
        else:
            otp = generate_otp()

           # OTP is sent to user's email via Celery background worker

            resp = send_email.delay(email,otp)
            print(resp)
            cookie_set(response,"em",email,OTP_EXPIRY)

            # Store hashed password in Redis with OTP expiry for temporary signup state

            hashed_password = hash_password_func(password) 

            redis_set_func( email, OTP_EXPIRY, 
            {
                 "email":email,
                "otp":otp,
                "role":role,
                "password":hashed_password,

            }
            )
            return {"redirect":"mail_sent"}
    except HTTPException:
        raise

    except Exception as e:
        print(e)
        
        raise HTTPException(status_code=500, detail="Internal Server Error")


@auth_router.post("/SignIn", status_code=status.HTTP_200_OK)
async def LoginRoute(usr: User, response: Response):
    try:
        user_data = usr.model_dump()
        email = user_data["email"]
        password = user_data["password"]
        user_exists = await User_collection.find_one({"email": email})
        if user_exists:
            user_exists["_id"] = str(user_exists["_id"])
            hashedpw = user_exists["password"]
            if check_password_func(password, hashedpw):
                token = token_generator_func(email, user_exists["role"])
                cookie_set(response,"access_token",token,SESSION_EXPIRY)
                return {"role": user_exists["role"]}
            else:
                raise HTTPException(status_code=401, detail="Wrong email or password")
        else:
            raise HTTPException(status_code=401, detail="Not Registered")

    except HTTPException:
        raise

    except Exception as e:
        print(e)
        
        raise HTTPException(status_code=500, detail="Internal Server Error")



@auth_router.post("/otpverification")
async def otp_verify(otp: OTP_Model, response: Response , req : Request):
    try:
        em = req.cookies.get("em")
        if not em or em is None:
            raise HTTPException(status_code=401, detail="Session Expired")
    
        otp_mod =otp.model_dump() 
        otp =int(otp_mod['otp'])
        otp_redis = _redis.get(f"otp:{em}")

        if  otp_redis is None :
            raise HTTPException(status_code=401, detail="Session Expired")
        
    
        otp_redis = int(otp_redis)

        email_redis = _redis.get(f"email:{em}")
        password_redis = _redis.get(f"password:{em}")
        role_redis = _redis.get(f"role:{em}")
        

        if not email_redis or not password_redis or not role_redis:
            raise HTTPException(401,detail="Session Expired")


        if otp_redis == otp:
            
            await User_collection.insert_one(
            {
                "email": email_redis,
                  "password": password_redis,
                    "role": role_redis,
                    "complaints":[]
                    
            }
            )

            _redis.delete(f"otp:{em}",f"email:{em}",f"password:{em}",f"role:{em}")
            response.delete_cookie("em")
            return {"redirect": "dashboard"}

        else:
            raise HTTPException(status_code=401, detail="Invalid OTP")

    except HTTPException:
        raise

    except Exception as e:
        print(e)
       
        raise HTTPException(status_code=500, detail="Internal Server Error")


