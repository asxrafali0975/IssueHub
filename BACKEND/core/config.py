import os
from dotenv import load_dotenv
load_dotenv()

SECRET_CODE = os.getenv("SECRET_CODE")
ALGO = os.getenv("ALGO")
MAIL_USERNAME=os.getenv("MAIL_USERNAME")
MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")


