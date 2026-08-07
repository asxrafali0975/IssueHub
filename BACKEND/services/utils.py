from random import randint
from services.redis import _redis
from fastapi import HTTPException
import re


def role_gen_func(email):
    """
    for deploying am allowing every mail to register
    provided it should be of gmail.com
    """
    # domain = email.split("@")[-1]
    # local = email.split("@")[0]

    # if domain != "axiscolleges.in":
    #     raise HTTPException(
    #         status_code=404,
    #         detail="Only institutional email (@axiscolleges.in) is allowed",
    #     )


    # is_year = local[:4].isdigit() and 2000 <= int(local[:4]) <= 2099
    return "student" 


def generate_otp():
    return randint(111111, 999999)


def redis_set_func(email, exp, data):
    for key, value in data.items():
        _redis.set(f"{key}:{email}", value, ex=exp)


def cookie_set(resp, key_, value_, time):
    resp.set_cookie(
        key=key_,
        value=value_,
        httponly=True,
        secure=True,
        samesite="none",
        max_age=time,
    )


def validate_password(recieved_password : str):
    if len(recieved_password) < 8:
        raise HTTPException(status_code=400, detail="Password should be minimum of 8 characters")
    
    if not re.search(r'\d', recieved_password):
        raise HTTPException(status_code=400, detail="Password must contain at least one number")
