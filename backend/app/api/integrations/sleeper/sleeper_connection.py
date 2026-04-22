from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import uuid4

router = APIRouter(prefix="/sleeperConnect", tags=["sleeperConnect"])