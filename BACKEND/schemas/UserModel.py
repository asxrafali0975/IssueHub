from pydantic import BaseModel, EmailStr, Field


class User(BaseModel):
    email: EmailStr
    password: str


class OtpModel(BaseModel):
    otp: str


class GetID(BaseModel):
    id: str
