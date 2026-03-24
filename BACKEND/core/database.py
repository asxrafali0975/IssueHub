from motor.motor_asyncio import AsyncIOMotorClient
from typing import Any

mongourl : str = "mongodb://localhost:27017/"
client : AsyncIOMotorClient[Any] = AsyncIOMotorClient(mongourl)
db :Any = client["IssueHUB"]
User_collection : Any= db['Users'] 

Complaints_collection : Any = db['Posts']