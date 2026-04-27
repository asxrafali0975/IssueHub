from fastapi_mail import ConnectionConfig
from fastapi import FastAPI
import certifi


app = FastAPI()

conf = ConnectionConfig(
    MAIL_USERNAME="ashrafalistudy@gmail.com",
    MAIL_PASSWORD = "vslc pzsx guoi hvsn",

    MAIL_FROM="youremail@gmail.com",
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    VALIDATE_CERTS=False 
    
)


