import os
import yaml
import re
import asyncio
from uuid import UUID

# Assuming these are in the same project structure or importable
from backend.app.core.qdrant_client import get_qdrant_client
from backend.app.services.embedding_service import process_chapter_for_rag, RAGIndex

# Configuration
DOCS_DIR = "docs/"
QDRANT_COLLECTION_NAME = "chapters"

async def index_chapter_mdx(file_path: str, chapter_id: UUID):
    print(f"Indexing chapter: {file_path}")
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter and body
    frontmatter_match = re.match(r'^---\s*\n([\s\S]*?)\n---', content)
    body_content = content
    if frontmatter_match:
        frontmatter = yaml.safe_load(frontmatter_match[1])
        body_content = content[frontmatter_match.end():].strip()

    # Process for RAG (chunking and embedding)
    rag_entries: List[RAGIndex] = await process_chapter_for_rag(chapter_id, body_content)

    if not rag_entries:
        print(f"No RAG entries generated for {file_path}")
        return

    # Initialize Qdrant client (placeholder for now)
    qdrant_client = get_qdrant_client()

    # Prepare points for Qdrant
    points = []
    for entry in rag_entries:
        points.append({
            "id": str(entry.id),
            "vector": entry.embedding,
            "payload": {
                "chapter_id": str(entry.chapter_id),
                "text_chunk": entry.text_chunk,
                "chunk_index": entry.metadata.get("chunk_index"),
                # Add other metadata from frontmatter if desired
                "title": frontmatter.get("title"),
                "week_number": frontmatter.get("week_number"),
            }
        })

    # Upsert to Qdrant (placeholder for actual upsert call)
    print(f"Simulating upsert of {len(points)} points to Qdrant collection '{QDRANT_COLLECTION_NAME}' for chapter {chapter_id}")
    # In a real scenario, you'd call:
    # qdrant_client.upsert(
    #     collection_name=QDRANT_COLLECTION_NAME,
    #     wait=True,
    #     points=points
    # )
    # print(f"Successfully upserted {len(points)} points for chapter {chapter_id}")

async def main():
    print("Starting RAG indexing process...")
    if not os.path.exists(DOCS_DIR):
        print(f"Error: {DOCS_DIR} directory not found. Please ensure content is ingested first.")
        return

    # Placeholder: In a real scenario, chapter_ids would come from a database
    # or a structured manifest. For this demo, we'll derive a dummy UUID.

    for filename in os.listdir(DOCS_DIR):
        if filename.endswith(".mdx"):
            file_path = os.path.join(DOCS_DIR, filename)
            # Generate a consistent UUID for the chapter based on its slug/filename
            # In a real system, this would be retrieved from a Chapter model/DB.
            dummy_chapter_id = UUID(int=sum(ord(c) for c in filename)) # Simple dummy UUID generation
            await index_chapter_mdx(file_path, dummy_chapter_id)

    print("RAG indexing process completed.")

if __name__ == "__main__":
    asyncio.run(main())