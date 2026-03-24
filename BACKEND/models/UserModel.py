from pydantic import BaseModel , EmailStr

class User(BaseModel):
    email : EmailStr
    password : str

class OTP_Model(BaseModel):
    otp:str



class GetID(BaseModel):
    id:str
