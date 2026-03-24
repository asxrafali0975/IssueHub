from fastapi import APIRouter , HTTPException , status , Depends,Response,Request, UploadFile, File, Form
from fastapi.responses import RedirectResponse
from core.database import User_collection , Complaints_collection
from models.UserModel import User
from core.security import *
import jwt
import os
import shutil

dash_router = APIRouter()

async def verify_jwt_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        # Not authenticated, redirect to login
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not_authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        token = token[2:-1]
        payload = get_token_func(token)
        email = payload["email"]
        role = payload["role"]
        print(email, role)
        if email is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid_token_payload"
            )
        # return this to endpoint
        return (email, role)

    except jwt.ExpiredSignatureError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token_expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid_token"
        )


from bson import ObjectId

@dash_router.get("/stud_dashboard")
async def stud_dashboard(user_data: tuple = Depends(verify_jwt_token)):

    try:

        email, role = user_data

        user = await User_collection.find_one({"email": email})

        if not user:
            return []

        uid = user["_id"]

        complaints = await Complaints_collection.find(
            {"user_id": uid}
        ).to_list(length=None)

        for c in complaints:
            c["_id"] = str(c["_id"])
            c["user_id"] = str(c["user_id"])

        return complaints

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
    

@dash_router.post("/submit_complaint")
async def submit_complaint(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...), 
    image: UploadFile = File(None),
    user_data: dict = Depends(verify_jwt_token),
    date: str = Form(...)
    
):
    try:

        email, role = user_data
        image_path = None

        os.makedirs("uploads", exist_ok=True)

        if image:

            import uuid

            filename = f"{uuid.uuid4()}_{image.filename}"
            file_location = f"uploads/{filename}"

            with open(file_location, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            image_path = file_location

        # user find
        user = await User_collection.find_one({"email": email})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user_id = user["_id"]

        complaint_data = {
            "user_id": user_id,
            "title": title,
            "description": description,
            "image": image_path,
            "category":category,
            "status": "pending",
            "forwarded": False,
            "date":date
            
        }

        # complaint insert

        result = await Complaints_collection.insert_one(complaint_data)

        complaint_id = result.inserted_id

        # user me complaint id push
        await User_collection.update_one(
            {"_id": user_id}, {"$push": {"complaints": complaint_id}}
        )

        return {
            "message": "Complaint submitted successfully",
            "complaint_id": str(complaint_id),
        }

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
