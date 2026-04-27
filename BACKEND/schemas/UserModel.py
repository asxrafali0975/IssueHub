from pydantic import BaseModel , EmailStr , Field

class User(BaseModel):
    email : EmailStr
    password : str 

class OTP_Model(BaseModel):
    otp:str  #should be int



class GetID(BaseModel):
    id:str



