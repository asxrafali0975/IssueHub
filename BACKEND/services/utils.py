from random import randint
from services.redis import _redis
from fastapi import HTTPException
 
def role_gen_func(email):
    domain = email.split("@")[-1]
    local = email.split("@")[0]
    
    if domain != "axiscolleges.in":
        raise HTTPException(status_code=404,  detail="Only institutional email (@axiscolleges.in) is allowed")
    
    is_year = local[:4].isdigit() and 2000 <= int(local[:4]) <= 2099
    return "student" if is_year else "faculty"

    
def generate_otp():
    return randint(111111 , 999999)


def redis_set_func(email, exp, data):
    for key, value in data.items():
        _redis.set(f"{key}:{email}", value, ex=exp)

def cookie_set(resp,key_,value_,time):
    print(value_)
    print(type(value_))
    print(repr(value_))
    resp.set_cookie(
        key=key_,
        value=value_,
        httponly=True,
        secure=False,
        samesite="lax",   
        max_age=time,
    )

