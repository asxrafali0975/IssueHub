from fastapi import FastAPI
import redis
import os
from dotenv import load_dotenv
app = FastAPI()
load_dotenv()



_redis = redis.from_url(os.environ.get("REDIS_URL"),decode_responses=True)
