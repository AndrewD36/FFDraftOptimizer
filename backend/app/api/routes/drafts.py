from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import uuid4
from app.core.dependencies import player_pool_service
from app.schemas.draft import CreateDraftRequest, MakePickRequest
from app.services.draft_engine import DraftEngine

router = APIRouter(prefix="/drafts", tags=["drafts"])


draft_store = {}
draft_engine = DraftEngine()


class CreateDraftRequest(BaseModel):
    name: str
    num_teams: int = 12


@router.post("/")
def create_draft(req: CreateDraftRequest):
    draft_id = str(uuid4())
    draft = draft_engine.create_draft(
        draft_id=draft_id,
        name=req.name,
        num_teams=req.num_teams,
    )
    draft_store[draft_id] = draft
    return draft


@router.get("/{draft_id}")
def get_draft(draft_id: str):
    draft = draft_store.get(draft_id)
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found.")
    return draft

@router.get("/{draft_id}/available-players")
def get_available_players(draft_id: str):
    draft = draft_store.get(draft_id)
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found.")

    drafted_ids = draft_engine.get_drafted_player_ids(draft)
    available_players = player_pool_service.get_available_players(drafted_ids)
    return available_players


@router.post("/{draft_id}/pick")
def make_pick(draft_id: str, req: MakePickRequest):
    draft = draft_store.get(draft_id)
    if not draft:
        raise HTTPException(status_code=404, detail="Draft not found.")

    player = player_pool_service.get_player_by_id(req.player_id)
    if not player:
        raise HTTPException(status_code=404, detail="Player not found.")

    try:
        updated_draft = draft_engine.make_pick(draft, req.player_id)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    draft_store[draft_id] = updated_draft
    return updated_draft

