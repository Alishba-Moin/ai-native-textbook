from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    NEON_POSTGRES_URL: str
    QDRANT_CLOUD_URL: str
    QDRANT_API_KEY: str
    # Add other settings here as needed

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
