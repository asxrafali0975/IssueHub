
#bcrypt works on bytes (encode("utf-8")) not on str so make sure to convert your str password
# to password.encode("utf-8")

from bcrypt import hashpw , checkpw , gensalt
import jwt 
from datetime  import datetime , timedelta , timezone
from typing import Any
from core.config import SECRET_CODE , ALGO


def token_generator_func(email,role):
    payload : dict[str , Any] = {
    "email":email,
    "role":role,
     "exp": datetime.now(timezone.utc) + timedelta(minutes=15)
    }

    #should add role here

    token = jwt.encode(payload , SECRET_CODE , algorithm= ALGO)
    return token

def get_token_func(token):
    decoded = jwt.decode(token,SECRET_CODE,algorithms=[ALGO])
    return decoded

def hash_password_func(password: str):
    hashed_password  = hashpw(password.encode("utf-8") , gensalt())
    return hashed_password
    
    
def check_password_func(password:str , hashed_password):
    if checkpw(password.encode("utf-8") , hashed_password):
        return True
    else:
        return False
    
