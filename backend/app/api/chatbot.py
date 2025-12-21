# from fastapi import APIRouter, Depends, HTTPException, status, Body
# from pydantic import BaseModel
# from typing import List, Optional, Dict
# from uuid import UUID
# import google.generativeai as genai
# import os

# from app.core.config import settings
# from app.core.qdrant_client import get_qdrant_client # To interact with Qdrant
# from app.services.embedding_service import rag_query # To generate query embeddings
# # from app.api.auth import get_current_user

# router = APIRouter()

# genai.configure(api_key=os.getenv("GEMINI_API_KEY", settings.GEMINI_API_KEY))
# rag_model = genai.GenerativeModel('gemini-2.5-flash') # Model for RAG response generation

# QDRANT_COLLECTION_NAME = "chapters"

# class ChatbotQuery(BaseModel):
#     query: str
#     chapter_id: Optional[UUID] = None # Optional: to narrow down search to a specific chapter

# class ChatbotResponse(BaseModel):
#     response: str
#     source_chunks: List[str] = [] # List of text chunks used as context
#     relevant_chapter_ids: List[UUID] = []

# async def search_qdrant_for_context(query_embedding: List[float], chapter_id: Optional[UUID] = None) -> List[str]:
#     # This is a placeholder for actual Qdrant search logic
#     # In a real implementation, you would use qdrant_client.search()
#     # and filter by chapter_id if provided.

#     print(f"Simulating Qdrant search with query embedding of length {len(query_embedding)}")

#     # Dummy search results for demonstration
#     if chapter_id:
#         return [
#             f"Context from chapter {chapter_id}: Robotics involves design, construction, operation, and use of robots.",
#             f"Context from chapter {chapter_id}: AI, mechanics, electronics, and computer science are key areas."
#         ]
#     else:
#         return [
#             "General context: Artificial Intelligence is a broad field.",
#             "General context: Robots are increasingly used in manufacturing and healthcare."
#         ]

# @router.post("/query", response_model=ChatbotResponse)
# async def chatbot_query(
#     query_data: ChatbotQuery, 
#     # current_user = Depends(get_current_user)
#     ):
#     query_embedding = await generate_embedding(query_data.query)
#     if not query_embedding:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to generate query embedding")

#     # Retrieve context from Qdrant
#     source_chunks = await search_qdrant_for_context(query_embedding, query_data.chapter_id)

#     # Construct the prompt for Gemini
#     context_str = "\n".join(source_chunks)
#     prompt = f"""
#     You are an AI assistant for a textbook on Physical AI and Humanoid Robotics.
#     Answer the user's question based on the provided context. If the answer is not in the context, state that you don't know.

#     Context:
#     {context_str}

#     User Question: {query_data.query}
#     Answer:
#     """

#     try:
#         response = rag_model.generate_content(prompt)
#         # Extract relevant chapter IDs from source_chunks metadata if available (placeholder)
#         relevant_chapter_ids = [query_data.chapter_id] if query_data.chapter_id else [] # Dummy

#         return ChatbotResponse(
#             response=response.text,
#             source_chunks=source_chunks,
#             relevant_chapter_ids=relevant_chapter_ids
#         )
#     except Exception as e:
#         raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Gemini API error: {e}")
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
from openai import OpenAI
from app.core.config import settings
from app.core.qdrant_client import get_qdrant_client

router = APIRouter()

# OpenAI Client (direct OpenAI API – hackathon requirement match)
client = OpenAI(api_key=settings.OPENAI_API_KEY)

QDRANT_COLLECTION_NAME = "chapters"

class ChatbotQuery(BaseModel):
    query: str
    chapter_id: Optional[str] = None  # string for simplicity
    selected_text: Optional[str] = None  # Hackathon core requirement

class ChatbotResponse(BaseModel):
    response: str
    source_chunks: List[str] = []
    relevant_chapter_ids: List[str] = []

async def search_qdrant_for_context(query_embedding: List[float], chapter_id: Optional[str] = None) -> List[str]:
    qdrant = get_qdrant_client()
    try:
        filter_dict = None
        if chapter_id:
            filter_dict = {
                "must": [
                    {"key": "chapter_id", "match": {"value": chapter_id}}
                ]
            }

        search_result = qdrant.search(
            collection_name=QDRANT_COLLECTION_NAME,
            query_vector=query_embedding,
            limit=5,
            with_payload=True,
            filter=filter_dict
        )

        chunks = []
        for hit in search_result:
            text = hit.payload.get('text', '')
            if text:
                chunks.append(text)

        return chunks
    except Exception as e:
        print(f"Qdrant search error: {e}")
        return ["No relevant context found."]

@router.post("/query", response_model=ChatbotResponse)
async def chatbot_query(query_data: ChatbotQuery):
    try:
        # Use selected_text for context if available (hackathon requirement)
        text_to_embed = query_data.selected_text or query_data.query

        # Generate embedding using OpenAI
        embedding_response = client.embeddings.create(
            model="text-embedding-ada-002",
            input=text_to_embed
        )
        query_embedding = embedding_response.data[0].embedding

        # Search Qdrant
        source_chunks = await search_qdrant_for_context(query_embedding, query_data.chapter_id)

        # Build context
        context_str = "\n\n".join(source_chunks)

        # Generate answer using OpenAI gpt-3.5-turbo
        messages = [
            {"role": "system", "content": "You are an expert assistant for the Physical AI & Humanoid Robotics textbook. Answer accurately using the provided context. If the answer is not in the context, say you don't know."},
            {"role": "user", "content": f"Context from book:\n{context_str}\n\nQuestion: {query_data.query}"}
        ]

        if query_data.selected_text:
            messages.append({
                "role": "user",
                "content": f"[User highlighted this text: \"{query_data.selected_text}\"]"
            })

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0.3,
            max_tokens=800
        )

        answer = response.choices[0].message.content.strip()

        # Extract chapter IDs
        relevant_chapter_ids = []
        qdrant = get_qdrant_client()
        search_result = qdrant.search(
            collection_name=QDRANT_COLLECTION_NAME,
            query_vector=query_embedding,
            limit=5,
            with_payload=True
        )
        for hit in search_result:
            ch_id = hit.payload.get('chapter_id')
            if ch_id and ch_id not in relevant_chapter_ids:
                relevant_chapter_ids.append(ch_id)

        return ChatbotResponse(
            response=answer,
            source_chunks=source_chunks,
            relevant_chapter_ids=relevant_chapter_ids
        )

    except Exception as e:
        print(f"Chatbot error: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")