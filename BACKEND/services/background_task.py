
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


# 🔥 Background Task (Celery Email Sender)
# Ye file Celery task define karti hai jo background me email bhejta hai
#
# Flow:
# FastAPI → send_email.delay() → Redis (queue) → Celery Worker → Email send
#
# Components:
# 1. @Clr_app.task → function ko Celery task banata hai
# 2. send_email() → actual background job (email bhejna)
# 3. MessageSchema → email ka structure (subject, body, recipients)
# 4. FastMail → email send karne ka engine
# 5. asyncio.run() → async function ko sync context me run karne ke liye
#
# Simple:
# - Ye function direct call nahi hota
# - .delay() se queue me jata hai
# - Celery worker ise background me execute karta hai


    
