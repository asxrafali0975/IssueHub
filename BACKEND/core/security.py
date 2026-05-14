
from bcrypt import hashpw , checkpw , gensalt
import jwt 
from datetime  import datetime , timedelta , timezone
from typing import Any
from core.config import SECRET_CODE , ALGO


def token_generator_func(email, role):
    payload = {
        "email": email,
        "role": role,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15)
    }

    token = jwt.encode(payload, SECRET_CODE, algorithm=ALGO)
    if isinstance(token, bytes):
        token = token.decode("utf-8")  
    return token

def get_token_func(token):
    decoded = jwt.decode(token,SECRET_CODE,algorithms=[ALGO])
    return decoded

def hash_password_func(password: str):
    return hashpw(password.encode("utf-8") , gensalt()).decode("utf-8")
   
    
    
def check_password_func(password: str, hashed_password):

    if isinstance(hashed_password, str):
        hashed_password = hashed_password.encode("utf-8")

    return checkpw(
        password.encode("utf-8"),
        hashed_password
    )
