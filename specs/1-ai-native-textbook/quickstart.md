# Quickstart Guide: AI-Native Textbook

This guide provides instructions to get the "Physical AI & Humanoid Robotics – AI-Native Textbook" project up and running quickly.

## Prerequisites

*   **Git**: For version control.
*   **Node.js (LTS)**: For Docusaurus frontend development.
*   **Python 3.11+**: For FastAPI backend development.
*   **Docker (Optional but recommended)**: For containerized development/deployment.
*   **npm or Yarn**: For JavaScript package management.
*   **Poetry or pipenv (Recommended)**: For Python dependency management.
*   **Google Cloud Project / Gemini API Key**: For Gemini 1.5 Flash/Pro access.
*   **Neon Postgres Account & Connection String**: For user database.
*   **Qdrant Cloud Account & API Key**: For vector database.
*   **GitHub Account**: For GitHub Pages deployment.
*   **Render or Vercel Account**: For FastAPI backend deployment.

## Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-org/ai-native-textbook.git
    cd ai-native-textbook
    ```

2.  **Frontend Setup (Docusaurus)**:
    ```bash
    cd src
    npm install # or yarn install
    ```

3.  **Backend Setup (FastAPI)**:
    ```bash
    cd backend
    python -m venv .venv
    source .venv/bin/activate # On Windows: .venv\Scripts\activate
    pip install poetry # If not already installed
    poetry install
    ```

4.  **Environment Variables**: Create a `.env` file in the `backend/` directory with the following (replace placeholders):
    ```env
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    NEON_POSTGRES_URL="YOUR_NEON_POSTGRES_CONNECTION_STRING"
    QDRANT_CLOUD_URL="YOUR_QDRANT_CLOUD_URL"
    QDRANT_API_KEY="YOUR_QDRANT_API_KEY"
    BETTER_AUTH_SECRET_KEY="YOUR_BETTER_AUTH_SECRET_KEY"
    # ... other secrets
    ```

## Development Server

1.  **Start Frontend**:
    ```bash
    cd src
    npm start # Docusaurus development server
    ```
    This will open http://localhost:3000 in your browser.

2.  **Start Backend**:
    ```bash
    cd backend
    source .venv/bin/activate
    poetry run uvicorn app.main:app --reload
    ```
    This will start the FastAPI server, usually on http://localhost:8000.

## Build and Deploy

### Frontend (Docusaurus to GitHub Pages)

1.  **Build Docusaurus**:
    ```bash
    cd src
    npm run build
    ```
    The static content will be generated in `build/`.

2.  **Deploy to GitHub Pages**: Configure your GitHub repository for GitHub Pages deployment from the `build` branch or `docs` directory, or use a GitHub Actions workflow.

### Backend (FastAPI to Render/Vercel)

1.  **Dockerize (Optional)**: Ensure your `backend/Dockerfile` is correctly set up.
2.  **Deploy**: Follow Render or Vercel's documentation for deploying FastAPI applications. You will need to configure environment variables on their platforms.

## Creating New Chapters

1.  Create a new MDX file in the `docs/` directory (e.g., `docs/chapter-14.mdx`).
2.  Add Docusaurus frontmatter and any custom metadata required by `chapter-metadata.json`.
3.  Update `src/sidebar.js` (or equivalent) to include the new chapter in the navigation.
4.  Run the RAG indexer script (once available) to update Qdrant with the new chapter's content.

## Running Quality Checks

*   **Frontend**: `cd src && npm test`
*   **Backend**: `cd backend && poetry run pytest`
*   **Code Linting**: Integrate ESLint/Prettier for frontend, Black/Flake8 for backend.

## Updating Glossary / RAG Index

*   Use `scripts/update_glossary.py` and `scripts/update_rag_index.py` (once implemented) to manage these features.
