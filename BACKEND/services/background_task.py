from fastapi_mail import FastMail, MessageSchema
from services.mail import conf


async def send_email(email, otp):
    message = MessageSchema(
        subject=f"Otp for IssueHUB",
        recipients=[email],
        body=f"Hello , your OTP for IssueHUB is {otp} , please do not share it with anyone",
        subtype="plain",
    )
    fm = FastMail(conf)
    await fm.send_message(message)
