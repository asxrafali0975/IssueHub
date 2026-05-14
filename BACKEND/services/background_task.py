
from fastapi_mail import FastMail, MessageSchema
from services.mail import conf
from services.celery import Clr_app
import asyncio

@Clr_app.task
def send_email(email,otp):
    message = MessageSchema(
    subject=f"Otp for IssueHUB",
    recipients=[email],
    body=f"Hello , your OTP for IssueHUB is {otp} , please do not share it with anyone",
    subtype="plain"
    )
    fm = FastMail(conf)
    asyncio.run(fm.send_message(message))

