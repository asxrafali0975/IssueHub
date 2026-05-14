from fastapi import FastAPI
import redis

app = FastAPI()

_redis = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)

