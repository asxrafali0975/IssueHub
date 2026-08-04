from fastapi import (
    APIRouter,
    HTTPException,
    status,
    Depends,
    Response,
    Request,
    UploadFile,
    File,
    Form,
)
from fastapi.responses import RedirectResponse
from core.database import User_collection, Complaints_collection
from schemas.UserModel import User
from core.security import get_token_func
import jwt, os, uuid, aiofiles

dash_router = APIRouter()

import cloudinary
from cloudinary.utils import cloudinary_url

import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.environ.get("cloud_name"),
    api_key=os.environ.get("api_key"),
    api_secret=os.environ.get("api_secret"),
    secure=True,
)


async def verify_jwt_token(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        # Not authenticated, redirect to login
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not_authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = get_token_func(token)
        email = payload["email"]
        role = payload["role"]
        print(email, role)

        if email is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid_token_payload"
            )
        # return this to endpoint
        roles_allowed = ["student"]

        if role not in roles_allowed:
            raise HTTPException(
                # means not allowed in this route
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="no permission to access this route",
            )

        return (email, role)

    except jwt.ExpiredSignatureError:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token_expired",
            headers={"WWW-Authenticate": "Bearer"},
        )

    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid_token"
        )


@dash_router.get("/stud_dashboard", status_code=status.HTTP_200_OK)
async def stud_dashboard(user_data: tuple = Depends(verify_jwt_token)):

    try:

        email, role = user_data

        user = await User_collection.find_one({"email": email})

        if not user:
            return []

        uid = user["_id"]

        complaints = await Complaints_collection.find({"user_id": uid}).to_list(
            length=None
        )

        for c in complaints:
            c["_id"] = str(c["_id"])
            c["user_id"] = str(c["user_id"])
            # c["image"] = cloudinary_url(c["image"], fetch_format="auto", quality="auto")

        return complaints

    except HTTPException:
        raise

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


import cloudinary.uploader


@dash_router.post("/submit_complaint", status_code=status.HTTP_201_CREATED)
async def submit_complaint(
    title: str = Form(...),
    description: str = Form(...),
    category: str = Form(...),
    image: UploadFile = File(None),
    user_data: dict = Depends(verify_jwt_token),
    date: str = Form(...),
):
    try:

        email, role = user_data
        image_path = None

        if image:

            content = await image.read()

            if not content:
                raise HTTPException(status_code=400, detail="Uploaded image is empty")

            try:

                upload_result = cloudinary.uploader.upload(
                    content,
                    public_id=f"{uuid.uuid4()}",
                    folder="complaints",
                    resource_type="image",
                )

                print("i am here 2 ")
                public_id = upload_result["public_id"]
                image_path = upload_result["secure_url"]

                print(f"public is :{public_id} , image path :{image_path}")

            except Exception as e:
                print(f"error is : {str(e)}")
                raise HTTPException(status_code=401, detail="Image Upload Failed")

        # user find
        user = await User_collection.find_one({"email": email})

        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        user_id = user["_id"]

        complaint_data = {
            "user_id": user_id,
            "title": title,
            "description": description,
            "image": public_id,
            "category": category,
            "status": "pending",
            "forwarded": False,
            "date": date,
        }

        # complaint insert

        result = await Complaints_collection.insert_one(complaint_data)

        complaint_id = result.inserted_id

        # user me complaint id push
        await User_collection.update_one(
            {"_id": user_id}, {"$push": {"complaints": complaint_id}}
        )

        return {
            "message": "Complaint submitted successfully",
            "complaint_id": str(complaint_id),
        }

    except HTTPException:
        raise

    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal Server Error")
