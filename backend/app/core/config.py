from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    NEON_POSTGRES_URL: str | None = None

    # Vector DB (Qdrant)
    QDRANT_CLOUD_URL: str | None = None
    QDRANT_API_KEY: str | None = None

    # LLM / Embeddings
    GEMINI_API_KEY: str | None = None
    OPENROUTER_API_KEY: str | None = None
    OPENROUTER_BASE_URL: str | None = None
    OPENAI_API_KEY : str| None = None
    OPENAI_BASE_URL : str | None = None
    # Auth
    BETTER_AUTH_SECRET_KEY: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="allow"   # VERY IMPORTANT
    )


settings = Settings()
