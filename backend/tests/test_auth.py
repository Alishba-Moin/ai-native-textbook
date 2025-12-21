import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the Physical AI & Humanoid Robotics API!"}

def test_register_user():
    response = client.post(
        "/api/auth/register",
        json={
            "email": "test@example.com",
            "password": "testpassword",
            "name": "Test User"
        },
    )
    assert response.status_code == 201
    assert "id" in response.json()
    assert response.json()["email"] == "test@example.com"

def test_register_existing_user():
    # Register once
    client.post(
        "/api/auth/register",
        json={
            "email": "test_exists@example.com",
            "password": "testpassword",
            "name": "Test User Existing"
        },
    )
    # Try to register again with the same email
    response = client.post(
        "/api/auth/register",
        json={
            "email": "test_exists@example.com",
            "password": "anotherpassword",
            "name": "Another User"
        },
    )
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already registered"}

def test_login_user():
    # First, register a user
    register_response = client.post(
        "/api/auth/register",
        json={
            "email": "login@example.com",
            "password": "loginpassword",
            "name": "Login User"
        },
    )
    assert register_response.status_code == 201

    # Then, attempt to log in
    login_response = client.post(
        "/api/auth/login",
        json={
            "email": "login@example.com",
            "password": "loginpassword"
        },
    )
    assert login_response.status_code == 200
    assert "id" in login_response.json()
    assert login_response.json()["email"] == "login@example.com"

def test_login_invalid_credentials():
    response = client.post(
        "/api/auth/login",
        json={
            "email": "nonexistent@example.com",
            "password": "wrongpassword"
        },
    )
    assert response.status_code == 401
    assert response.json() == {"detail": "Invalid credentials"}

