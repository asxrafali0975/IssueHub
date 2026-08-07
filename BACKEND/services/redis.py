from fastapi import FastAPI
import redis
import os
app = FastAPI()


_redis = redis.from_url(os.environ.get("REDIS_URL"),decode_responses=True)
