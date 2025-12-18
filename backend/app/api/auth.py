from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from uuid import UUID

# Assuming these models will be created in models/user.py and models/user_profile.py
from app.models.user import User
from app.models.user_profile import UserProfile
from app.core.config import settings

router = APIRouter()

# Placeholder for password hashing - replace with a robust library like bcrypt
def hash_password(password: str) -> str:
    # In a real application, use a proper hashing library (e.g., bcrypt, argon2)
    # For now, a simple placeholder
    return f"hashed_{password}_securely"

# Placeholder for verifying password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    # In a real application, use a proper hashing library to verify
    return hash_password(plain_password) == hashed_password

class UserRegistration(BaseModel):
    email: str
    password: str
    name: str

class UserLogin(BaseModel):
    email: str
    password: str

# --- Placeholder for database operations (will be replaced with actual DB interactions) ---
# In-memory storage for demonstration
dummy_users_db: list[User] = []
dummy_profiles_db: list[UserProfile] = []

@router.post("/register", response_model=User, status_code=status.HTTP_201_CREATED)
async def register_user(registration: UserRegistration):
    # Check if user already exists
    if any(user.email == registration.email for user in dummy_users_db):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")

    hashed_password = hash_password(registration.password)

    new_user = User(
        email=registration.email,
        password_hash=hashed_password,
        created_at=datetime.utcnow(),
        last_login_at=datetime.utcnow(),
    )
    dummy_users_db.append(new_user)

    new_profile = UserProfile(
        user_id=new_user.id,
        name=registration.name,
        software_background="", # To be filled by survey
        hardware_background="", # To be filled by survey
        learning_pace_preference="", # To be filled by survey
    )
    dummy_profiles_db.append(new_profile)
    new_user.profile_id = new_profile.id # Link profile to user

    return new_user

@router.post("/login", response_model=User)
async def login_user(login: UserLogin):
    user = next((u for u in dummy_users_db if u.email == login.email), None)
    if not user or not verify_password(login.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    # Update last login time
    user.last_login_at = datetime.utcnow()
    return user

# Dependency to get current user (for protected routes)
async def get_current_user(user_id: UUID = Depends(lambda: "some_token_decode_logic")) -> User:
    # This is a placeholder. In a real app, this would decode a JWT or session token
    # and fetch the user from the database.
    user = next((u for u in dummy_users_db if u.id == user_id), None)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    return user
