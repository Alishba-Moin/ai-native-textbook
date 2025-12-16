from qdrant_client import QdrantClient
from .config import settings

def get_qdrant_client() -> QdrantClient:
    client = QdrantClient(
        url=settings.QDRANT_CLOUD_URL,
        api_key=settings.QDRANT_API_KEY,
    )
    return client

