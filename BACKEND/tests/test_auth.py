from httpx import AsyncClient, ASGITransport
import pytest
from main import app
from core.security import token_generator_func, hash_password_func, check_password_func


async def test_signup_success(mocker):
    mocker.patch(
        "api.auth.User_collection.find_one",
        new_callable=mocker.AsyncMock,
        return_value=None,
    )
    mocker.patch("api.auth.redis_set_func")
    mocker.patch("api.auth.generate_otp", return_value=123456)
    transport = ASGITransport(app=app)

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
            "/auth/SignUp",
            json={"email": "newuser@gmail.com", "password": "password123"},
        )

    assert response.status_code == 201
    assert response.json() == {"redirect": "mail_sent"}


async def test_signup_duplicate_email(mocker):
    mocker.patch(
            "api.auth.User_collection.find_one",
            new_callable=mocker.AsyncMock,
            return_value={"email": "exists@gmail.com"}
        )
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
           "/auth/SignUp",
            json={"email": "exists@gmail.com", "password": "password123"},
        )
    assert response.status_code == 409




async def test_signin_success(mocker):
    password_str = "#okli$59Cnloud"
    hashed = hash_password_func(password_str)
    mocker.patch(
            "api.auth.User_collection.find_one",
            new_callable=mocker.AsyncMock,
            return_value={
            "_id": "507f1f77bcf86cd799439011",
            "email": "exists@gmail.com",
            "password": hashed,
            "role": "student",
        },
        )


    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
           "/auth/SignIn",
            json={"email": "exists@gmail.com", "password": "#okli$59Cnloud"},
        )
    assert response.status_code == 200

async def test_signin_user_not_exist(mocker):
    password_str = "#okli$59Cnloud"
    hashed = hash_password_func(password_str)
    mocker.patch(
            "api.auth.User_collection.find_one",
            new_callable=mocker.AsyncMock,
            return_value=None
        )


    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
           "/auth/SignIn",
            json={"email": "exists1234@gmail.com", "password": "#okli$59Cnloud"},
        )
    assert response.status_code == 401


async def test_signin_wrong_password(mocker):
    password_str = "#okli$59Cnloud"
    hashed = hash_password_func(password_str)
    mocker.patch(
            "api.auth.User_collection.find_one",
            new_callable=mocker.AsyncMock,
            return_value={
            "_id": "507f1f77bcf86cd799439011",
            "email": "exists@gmail.com",
            "password": hashed,
            "role": "student",
        },
        )


    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.post(
           "/auth/SignIn",
            json={"email": "exists@gmail.com", "password": "#okli$59Cnloudksone"},
        )
    assert response.status_code == 401

