from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# API Routers
from app.api.chatbot import router as chatbot_router
from app.api.personalization import router as personalization_router
from app.api.translation import router as translation_router
from app.api.auth import router as auth_router
from app.api.user import router as user_router
from app.api.subagents import router as subagents_router

app = FastAPI(
    title="AI-Native Textbook Backend",
    description="RAG Chatbot, Personalization, Urdu Translation, Sub-Agents",
    version="1.0.0",
)

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later replace with GitHub Pages URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- ROUTERS --------------------
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(user_router, prefix="/api/user", tags=["User"])
app.include_router(chatbot_router, prefix="/api/chatbot", tags=["Chatbot"])
app.include_router(personalization_router, prefix="/api/personalize", tags=["Personalization"])
app.include_router(translation_router, prefix="/api/translate", tags=["Translation"])
app.include_router(subagents_router, prefix="/api/subagents", tags=["Sub-Agents"])

# -------------------- ROOT --------------------
@app.get("/")
async def root():
    return {
        "status": "running",
        "message": "AI-Native Textbook Backend is Live 🚀"
    }

@app.get("/health")
async def health():
    return {"status": "healthy"}
