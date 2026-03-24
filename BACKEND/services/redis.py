from fastapi import FastAPI
import redis

app = FastAPI()

_redis = redis.Redis(
    host="localhost",
    port=6379,
    decode_responses=True
)


# 🔴 Redis kya hota hai

# 👉 Redis = in-memory data store (RAM me data rakhta hai)
# 👉 super fast (DB se bhi fast)

# 🧠 Simple Hinglish

# DB (MySQL) → slow but permanent

# Redis → fast but temporary

# 🔥 Redis use kaha hota hai
# 1. ✅ Celery queue (tere case me)

# 👉 sabse important

# .delay() → task Redis me store

# Celery worker → Redis se uthata hai

# 👉 Redis = queue system

# 2. ✅ Caching

# 👉 repeated data fast dene ke liye

# Example:

# user data DB se liya

# Redis me store kiya

# next time direct Redis se

# 3. ✅ Session storage

# 👉 login/session store karne ke liye

# 4. ✅ Pub/Sub (real-time)

# 👉 chat apps, notifications