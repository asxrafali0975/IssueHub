
from celery import Celery

Clr_app = Celery("IssueHub",broker="redis://localhost:6379/0",backend="redis://localhost:6379/0")

from services.background_task import *



# 🔥 Celery Setup (Background Task System)
# Celery ek asynchronous task queue hai jo heavy ya slow kaam
# (jaise email bhejna, background processing) ko main app se alag run karta hai
#
# Flow:
# FastAPI → .delay() → Redis (broker/queue) → Celery Worker → Task Execute → Result Backend
#
# Components:
# 1. Clr_app → Celery ka main instance (entry point)
# 2. "IssueHub" → app ka naam (identifier, internal use)
# 3. broker → Redis URL (yaha tasks queue hote hain)
# 4. backend → Redis URL (yaha task ka result/status store hota hai)
#
# Simple:
# - Broker = task bhejne ka system (queue)
# - Worker = task karne wala
# - Backend = result save karne wala