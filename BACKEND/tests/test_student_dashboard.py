import jwt
import pytest 
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, MagicMock
from fastapi import FastAPI
from fastapi.testclient import TestClient
from main import app
from bson import ObjectId
from api.student_dashboard import verify_jwt_token



@pytest.mark.asyncio
async def test_stud_dashboard_not_exist(mocker):
    email  = "test@gmail.com"
    role = "student"

    # auth bypass
    app.dependency_overrides[verify_jwt_token] = lambda: (email, role)

    mocker.patch(
            "api.student_dashboard.User_collection.find_one",
            new_callable=mocker.AsyncMock,
            return_value=None,
        )

    transport = ASGITransport(app=app)

    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get(
                "/dash/stud_dashboard",

            )
    assert response.status_code == 200
    assert response.json()==[]


# Complete Tommorow

@pytest.mark.asyncio
async def test_stud_dashboard_success(mocker):
    email  = "test@gmail.com"
    role = "student"

    # auth bypass
    app.dependency_overrides[verify_jwt_token] = lambda: (email, role)

    uid = ObjectId()
    cid = ObjectId()


    mocker.patch(
        "api.student_dashboard.User_collection.find_one",
        new_callable=mocker.AsyncMock,
        return_value={"_id": uid, "email": "test@gmail.com"},
    )

    
    cursor = MagicMock()

    cursor.to_list = AsyncMock(return_value=[
        {"_id": cid, "user_id": uid, "title": "Wifi down"}
    ])


    find_mock = mocker.patch(
        "api.student_dashboard.Complaints_collection.find",
        return_value=cursor,   # MagicMock, AsyncMock nahi!
    )
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:
        response = await client.get("/dash/stud_dashboard")  # apna sahi URL

    app.dependency_overrides.clear()
    assert response.status_code == 200
    assert response.json() == [
        {"_id": str(cid), "user_id": str(uid), "title": "Wifi down"}
    ]
    find_mock.assert_called_once_with({"user_id": uid})


    


    

    