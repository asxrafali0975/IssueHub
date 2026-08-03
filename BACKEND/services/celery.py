from celery import Celery

clr_app = Celery(
    "IssueHub", broker="redis://localhost:6379/0", backend="redis://localhost:6379/0"
)

from services.background_task import *
