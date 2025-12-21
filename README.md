# Physical AI & Humanoid Robotics – AI-Native Textbook

## Project Overview

This project is an AI-Native Textbook on Physical AI & Humanoid Robotics, developed for the Panaversity Hackathon. It features a Docusaurus v3 frontend for interactive content delivery and a FastAPI backend powering various AI functionalities. The textbook is designed to be highly personalized and interactive, leveraging advanced AI models for content generation, personalization, translation, and an embedded RAG chatbot.

## Key Features

- **Docusaurus v3 Frontend**: A modern static website displaying 13 weeks of curriculum content in MDX format, deployed via GitHub Pages.
- **FastAPI Backend**: A robust Python backend serving AI capabilities, designed for deployment on platforms like Render or Vercel.
- **AI-Powered RAG Chatbot**: An embedded chatbot, powered by Google Gemini 1.5 Flash/Pro, provides conversational AI based on the textbook content. It utilizes Neon Serverless Postgres for user data and Qdrant Cloud for vector embeddings to facilitate Retrieval-Augmented Generation (RAG).
- **User Authentication & Profiles**: Secure user management with Better Auth, including a 4-question background survey during signup to tailor content delivery.
- **Content Personalization**: "Personalize for me" feature uses Gemini to adapt chapter content based on individual user profiles (difficulty, background, learning pace).
- **Multi-lingual Support**: "اردو میں پڑھیں" (Read in Urdu) button leverages Gemini for on-demand content translation into Urdu.
- **Claude Code Subagents**: Reusable subagents for advanced functionalities such as quiz generation, content summarization, and diagram explanation.
- **Spec-Driven Development (SDD)**: Built with 100% adherence to Spec-Kit Plus and Claude Code methodologies, ensuring structured and maintainable development.
- **Accessibility & Performance**: Designed to meet WCAG AA accessibility standards and achieve high-performance metrics (e.g., <3s initial load, <5s for personalization/translation, <3s for chatbot responses).

## Technology Stack

### Frontend
- **Framework**: Docusaurus v3
- **Language**: TypeScript, React
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Pages

### Backend
- **Framework**: FastAPI
- **Language**: Python 3.11+
- **ASGI Server**: Uvicorn
- **Deployment**: Render / Vercel (planned)

### AI/ML
- **LLM**: Google Gemini 1.5 Flash/Pro (via Google Generative AI SDK)
- **Vector Database**: Qdrant Cloud (Free Tier)
- **Embedding Model**: Gemini's `models/embedding-001`

### Data
- **Database**: Neon Serverless Postgres (user data, Better Auth)

### Development & CI/CD
- **Package Management (Frontend)**: npm
- **Package Management (Backend)**: Poetry
- **Containerization**: Docker
- **CI/CD**: GitHub Actions

## Setup and Local Development

### Prerequisites

- Node.js (v18 or higher) & npm
- Python 3.11+
- Poetry (for Python dependency management)
- Docker (optional, for backend containerization)
- Git

### Environment Variables

Create a `.env` file in the `backend/` directory based on `backend/.env.example` and fill in your credentials:

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
NEON_POSTGRES_URL="YOUR_NEON_POSTGRES_CONNECTION_STRING"
QDRANT_CLOUD_URL="YOUR_QDRANT_CLOUD_URL"
QDRANT_API_KEY="YOUR_QDRANT_API_KEY"
BETTER_AUTH_SECRET_KEY="YOUR_BETTER_AUTH_SECRET_KEY"
```

### 1. Frontend Setup

Navigate to the `src` directory:

```bash
cd src
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### 2. Backend Setup

Navigate to the `backend` directory:

```bash
cd backend
```

Install Python dependencies using Poetry:

```bash
poetry install
```

Run the FastAPI application locally:

```bash
poetry run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The backend API will be available at `http://localhost:8000`.

### 3. Content Ingestion (Required for Docs)

From the project root, run the content ingestion script to generate MDX files from chapter specifications:

```bash
python scripts/ingest_content.py
```

This will populate the `docs/` directory, which Docusaurus uses to build the textbook content.

### 4. RAG Indexing (Required for Chatbot)

After content ingestion, run the RAG indexing script to create vector embeddings and upsert them to Qdrant:

```bash
python scripts/rag_indexer.py
```

This step is crucial for the embedded RAG chatbot to function correctly.

## Build and Deployment

### Frontend (Docusaurus)

To build the static website:

```bash
cd src
npm run build
```

This command generates static content into the `src/build` directory.

Deployment to GitHub Pages is automated via GitHub Actions (`.github/workflows/deploy-frontend.yml`) on pushes to the `main` branch.

### Backend (FastAPI)

Deployment to Render/Vercel is planned and will be automated via GitHub Actions (`.github/workflows/deploy-backend.yml`). The Dockerfile (`backend/Dockerfile`) is provided for containerized deployment.

## Project Structure

- `.github/workflows/`: GitHub Actions CI/CD workflows.
- `backend/`: FastAPI application, models, services, and API endpoints.
- `docs/`: Generated MDX chapter files for Docusaurus.
- `scripts/`: Utility scripts (e.g., content ingestion, RAG indexing).
- `src/`: Docusaurus frontend application, components, and styling.
- `specs/1-ai-native-textbook/`: Original chapter specifications and project design documents (e.g., `data-model.md`).
- `history/prompts/`: Prompt History Records.
- `history/adr/`: Architecture Decision Records.
- `.specify/`: SpecKit Plus templates and scripts.

## Contributing

Please refer to the `CONTRIBUTING.md` (planned) for guidelines on how to contribute to this project.

## License

This project is licensed under the MIT License. See the `LICENSE` (planned) file for details.
