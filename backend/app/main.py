from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import drafts
from app.api.integrations.sleeper import sync_user
from app.core.dependencies import player_pool_service

app = FastAPI(title="War Room API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# @app.on_event("startup")
# def startup_event():
#     player_pool_service.load_players()


app.include_router(drafts.router)
app.include_router(sync_user.router)


@app.get("/")
def root():
    return {"message": "War Room API running"}