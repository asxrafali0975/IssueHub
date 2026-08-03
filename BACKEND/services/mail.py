from fastapi_mail import ConnectionConfig
from fastapi import FastAPI
import certifi
import dotenv
import os
from dotenv import load_dotenv

load_dotenv()


app = FastAPI()

conf = ConnectionConfig(
    MAIL_USERNAME=os.environ.get("MAIL_USERNAME", "ashrafalistudy@gmail.com"),
    MAIL_PASSWORD=os.environ.get("MAIL_PASSWORD", "xyze jjjj kkkk llll"),
    MAIL_FROM=os.environ.get("MAIL_USERNAME"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    VALIDATE_CERTS=False,
)
