from typing import Any
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

uri = os.environ.get("mongourl")
if not uri:
    raise ValueError("mongourl not found in .env")

client: AsyncIOMotorClient = AsyncIOMotorClient(uri)

db: Any = client["IssueHUB"]
User_collection: Any = db["Users"]
Complaints_collection: Any = db["Posts"]