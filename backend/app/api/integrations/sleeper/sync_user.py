from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
from uuid import uuid4

BASE_URL = "https://api.sleeper.app/v1"

router = APIRouter(prefix="/sleeperConnect", tags=["sleeperConnect"])

@router.get("/{username}")
def get_draft(username: str):
    url = f"{BASE_URL}/user/{username}"
    response = requests.get(url, timeout=30)
    response.raise_for_status()

    data = response.json()
    
    # if not isinstance(data, dict):
    #     raise HTTPException(status_code=400 detail=f"Expected a user object, got: {type(data).__name__}")
    if not data:
        raise HTTPException(status_code=404, detail="User not found.")
    return data