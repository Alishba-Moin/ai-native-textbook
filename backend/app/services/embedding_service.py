from openai import OpenAI
from qdrant_client import QdrantClient
from app.core.config import settings

client = OpenAI(api_key=settings.OPENAI_API_KEY)

qdrant = QdrantClient(settings.QDRANT_CLOUD_URL, api_key=settings.QDRANT_API_KEY)

async def generate_embedding(text: str) -> List[float]:
    try:
        response = client.embeddings.create(
            model="text-embedding-ada-002",
            input=text
        )
        return response.data[0].embedding
    except Exception as e:
        raise Exception(f"Embedding error: {str(e)}")

async def rag_query(query: str, chapter_id: Optional[str] = None, selected_text: Optional[str] = None):
    try:
        content = selected_text or query
        embedding = await generate_embedding(content)

        # Qdrant search
        search_result = qdrant.search(
            collection_name="chapters",
            query_vector=embedding,
            limit=5,
            filter={"must": [{"key": "chapter_id", "match": {"value": chapter_id}}]} if chapter_id else None
        )

        source_chunks = [hit.payload['text'] for hit in search_result if hit.payload and 'text' in hit.payload]

        # OpenAI generation
        context_str = "\n".join(source_chunks)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant for the Physical AI & Humanoid Robotics textbook. Use the context to answer."},
                {"role": "user", "content": f"Context: {context_str}\n\nQuery: {query}"}
            ],
            temperature=0.3
        )

        answer = response.choices[0].message.content
        return answer, source_chunks
    except Exception as e:
        raise Exception(f"RAG error: {str(e)}")