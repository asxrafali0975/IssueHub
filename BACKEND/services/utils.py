from random import randint
from services.redis import _redis
 
def role_gen_func(email):
    value = email.split("@")[0][0:4]
    is_year = value.isdigit() and 2000 <= int(value) <= 2099
    if email.startswith("admin"):
        return "admin"
    elif email.startswith("issuehub"):
        return "team"
    elif is_year:
        return "student"
    else:
        return "faculty"

    
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

