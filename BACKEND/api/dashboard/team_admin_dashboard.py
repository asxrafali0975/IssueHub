from fastapi import APIRouter, Request, HTTPException, status, Depends
from core.security import *
from core.database import Complaints_collection
from models.UserModel import GetID
from bson import ObjectId

team_router = APIRouter()


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
        token = token[2:-1]
        payload = get_token_func(token)
        email = payload["email"]
        role = payload["role"]

        if email is None or role is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid_token_payload"
            )
        
        roles_allowed = ["admin", "team"]

        if role not in roles_allowed:
            raise HTTPException(
                #means not allowed in this route
                status_code=status.HTTP_401_UNAUTHORIZED, detail="no permission to access this route"
            )
        # return this to endpoint
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


# fetch all complaints
@team_router.get("/team_dashboard")
async def team_dashboard(
    page: int = 1, limit: int = 10, user_data: tuple = Depends(verify_jwt_token)
):
    email, role = user_data
    if role != "team":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="no permission to access this route"
        )
    
    skip = (page - 1) * limit
    complaints = (
        await Complaints_collection.find({"forwarded": False})
        .skip(skip)
        .limit(limit)
        .to_list(length=limit)
    )

    for c in complaints:
        c["_id"] = str(c["_id"])
        c["user_id"] = str(c["user_id"])

    return complaints


# forward complaint or team dashboard
# check if token exist , if not exist login if exist check role and etc if role == team then allow else reject


@team_router.post("/forward_complaint")
async def forward_complaint(id: GetID, user_data: tuple = Depends(verify_jwt_token)):
    email, role = user_data
    if role != "team":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="no permission to access this route"
        )
    cid = id.id

    complaint = await Complaints_collection.find_one({"_id": ObjectId(cid)})

    if complaint:

        await Complaints_collection.update_one(
            {"_id": ObjectId(cid)}, {"$set": {"forwarded": True}}
        )

        complaint["_id"] = str(complaint["_id"])
        complaint["user_id"] = str(complaint["user_id"])
        complaint["forwarded"] = True

        return complaint

    return {"message": "Complaint not found"}


@team_router.get("/get_forwarded")
async def get_forwarded(user_data: tuple = Depends(verify_jwt_token)):
    email, role = user_data

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="no permission to access this route"
        )

    complaints = await Complaints_collection.find(
        {"forwarded": True, "status": "pending"}
    ).to_list(length=None)

    for c in complaints:
        c["_id"] = str(c["_id"])
        c["user_id"] = str(c["user_id"])

    return complaints


@team_router.post("/resolve/{cid}")
async def resolve_complaint(cid: str, user_data: tuple = Depends(verify_jwt_token)):
    email, role = user_data

    if role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="no permission to access this route"
        )

    await Complaints_collection.update_one(
        {"_id": ObjectId(cid)}, {"$set": {"status": "resolved"}}
    )

    return {"message": "Complaint resolved"}
