# Implementation Plan: Physical AI & Humanoid Robotics – AI-Native Textbook

**Branch**: `1-ai-native-textbook` | **Date**: 2025-12-11 | **Spec**: [specs/1-ai-native-textbook/spec.md](specs/1-ai-native-textbook/spec.md)
**Input**: Feature specification from `/specs/1-ai-native-textbook/spec.md`

## Summary

This project aims to develop a Docusaurus v3 website, "Physical AI & Humanoid Robotics – AI-Native Textbook," deployed on GitHub Pages. It will feature 13 weeks of content (sourced from existing chapter specs and rendered as MDX), an embedded RAG chatbot powered by Gemini 1.5 Flash/Pro with FastAPI, Neon Postgres, and Qdrant Cloud. Key functionalities include user authentication with a software/hardware background survey (Better Auth), per-chapter personalization and Urdu translation buttons (via Gemini), and reusable Claude Code subagents (quiz generator, summary, diagram explainer). The technical approach emphasizes spec-driven development using Spec-Kit Plus and Claude Code, focusing on educational clarity, WCAG AA accessibility, and optimal performance for hackathon scoring.

## Technical Approach

The project will adopt a decoupled frontend-backend architecture. The Docusaurus frontend will be responsible for static content delivery, enhanced by dynamic React components for interactive features. The FastAPI backend will serve as the API gateway for all AI-powered functionalities, including RAG chatbot interactions, content personalization, and translation services. User authentication and profile management will be handled by Better Auth, leveraging Neon Serverless Postgres. Vector embeddings for the RAG system will be managed by Qdrant Cloud. All AI interactions will exclusively utilize the Gemini API. The entire development process will strictly adhere to the Spec-Kit Plus and Claude Code methodology, ensuring robust planning, execution, and traceability.

## Technical Context

**Language/Version**: Python 3.11+ (FastAPI backend), JavaScript/TypeScript (Docusaurus frontend)
**Primary Dependencies**: Docusaurus 3, MDX, React, Tailwind CSS, FastAPI, Uvicorn, SQLAlchemy (or similar ORM for Postgres), Neon Serverless Postgres client, Qdrant client, Better Auth client libraries, Google Generative AI SDK (for Gemini API).
**Storage**: Neon Serverless Postgres (user authentication data, user profiles, survey responses, chapter metadata, potentially content metadata). Qdrant Cloud Free Tier (vector embeddings for RAG content).
**Testing**:
*   **Frontend**: Jest, React Testing Library (unit/component testing), Playwright/Cypress (end-to-end testing for Docusaurus pages, button interactions, chatbot UI).
*   **Backend**: Pytest (unit/integration testing for FastAPI routes, database interactions, LLM integrations).
**Target Platform**: Frontend: GitHub Pages; Backend: Render/Vercel (serverless functions or containerized deployment).
**Project Type**: Web application (Frontend: Static Site Generation with dynamic React components; Backend: RESTful API).
**Performance Goals**:
*   Initial page load (Docusaurus): < 3 seconds (WCAG AA compliance).
*   Personalized chapter content generation/display: < 5 seconds for 95% of requests.
*   Urdu chapter translation generation/display: < 5 seconds for 95% of requests.
*   RAG Chatbot response: < 3 seconds for 90% of queries.
**Constraints**:
*   100% Spec-Kit Plus + Claude Code usage for development workflow.
*   Exclusive use of Gemini API (1.5 Flash/Pro) for all AI functionalities.
*   Deployment targets: GitHub Pages (frontend), Render/Vercel (backend).
*   Adherence to hackathon scoring criteria (base 100 + 200 bonuses).
*   WCAG AA accessibility compliance.
*   Integration of all existing chapter specifications as MDX.
**Scale/Scope**:
*   13 weeks of textbook content.
*   Support for multiple concurrent users with personalized experiences.
*   Thousands of RAG queries per day.
*   Ongoing content updates and additions.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Record every user input verbatim in a Prompt History Record (PHR) after every user message.**
  - **Compliance**: PASS. Integrated within the Spec-Kit Plus workflow.
- [x] **ADR suggestions: when an architecturally significant decision is detected, suggest: "📋 Architectural decision detected: <brief>. Document? Run `/sp.adr <title>`."**
  - **Compliance**: PASS. Handled by Spec-Kit Plus.
- [x] **Authoritative Source Mandate: Agents MUST prioritize and use MCP tools and CLI commands for all information gathering and task execution.**
  - **Compliance**: PASS. The plan emphasizes the use of specified tools and CLI commands for all development phases.
- [x] **Execution Flow: Treat MCP servers as first-class tools for discovery, verification, execution, and state capture. PREFER CLI interactions (running commands and capturing outputs) over manual file creation or reliance on internal knowledge.**
  - **Compliance**: PASS. Implicitly supported by the Spec-Kit Plus methodology.
- [x] **Knowledge capture (PHR) for Every User Input.**
  - **Compliance**: PASS. Integrated within the Spec-Kit Plus workflow.
- [x] **Explicit ADR suggestions.**
  - **Compliance**: PASS. Handled by Spec-Kit Plus.
- [x] **Human as Tool Strategy.**
  - **Compliance**: PASS. The plan accounts for necessary user interaction for clarification and decisions.
- [x] **Default policies (must follow): Clarify and plan first, Do not invent APIs, data, or contracts, Never hardcode secrets or tokens, Prefer the smallest viable diff, Cite existing code with code references, Keep reasoning private.**
  - **Compliance**: PASS. All policies are upheld by the Spec-Kit Plus framework and the structured planning approach.
- [x] **Minimum acceptance criteria.**
  - **Compliance**: PASS. Explicitly defined in the feature specification (`spec.md`).

## Project Structure

### Documentation (this feature)

```text
specs/1-ai-native-textbook/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
│   ├── chapter-metadata.json
│   ├── user-profile.json
│   ├── api-routes.json
│   ├── sidebar-config.ts
│   └── react-components.ts
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
.
├── .specify/                         # Spec-Kit Plus configuration and scripts
├── docs/                             # Docusaurus content (MDX chapters)
│   ├── intro.md
│   └── chapter-n.mdx                 # Imported from existing chapter specs
├── blog/                             # Docusaurus blog (if applicable)
├── src/                              # Docusaurus frontend source (React components, styles)
│   ├── components/                   # React components (e.g., Chatbot, AuthForm, PersonalizeButton, TranslateButton)
│   ├── pages/                        # Custom Docusaurus pages
│   ├── css/                          # Tailwind CSS config and custom styles
│   └── theme/                        # Docusaurus theme overrides
├── backend/                          # FastAPI backend services
│   ├── app/
│   │   ├── api/                      # FastAPI routes (RAG, Personalization, Translation, Auth)
│   │   ├── core/                     # Core logic, configurations
│   │   ├── models/                   # Pydantic models for request/response, database models
│   │   └── services/                 # Business logic, external API integrations (Gemini, Qdrant, Neon)
│   ├── tests/                        # Backend tests
│   ├── .env.example                  # Environment variables
│   └── main.py                       # FastAPI application entry point
├── static/                           # Docusaurus static assets
├── scripts/                          # Utility scripts (e.g., content ingestion, RAG indexer)
├── .github/                          # GitHub Actions workflows (CI/CD)
├── history/                          # Prompt History Records (PHRs) and ADRs
│   ├── adr/
│   └── prompts/
├── package.json                      # Frontend dependencies
├── requirements.txt                  # Backend Python dependencies
├── tsconfig.json                     # TypeScript configuration
└── tailwind.config.js                # Tailwind CSS configuration
```

**Structure Decision**: A monorepo-like structure with `src/` for Docusaurus frontend, `backend/` for FastAPI, and `docs/` for MDX content. This clearly separates concerns while maintaining a single repository for hackathon submission.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Multi-language content | Global accessibility and hackathon bonus point. | Limiting to English would reduce reach and hackathon score. |
| User personalization | Core AI-native feature and hackathon bonus point. | Static content would fail to leverage AI for adaptive learning. |
| Embedded RAG Chatbot | Essential AI-native feature and hackathon bonus point. | Simple FAQ or search wouldn't provide contextual, dynamic assistance. |
| Two separate deployment targets | Frontend is static, backend requires server logic. | Monolithic deployment would complicate scaling and specialized hosting benefits. |

## Phase 0: Research & Technology Decisions

### Research Tasks

1.  **Docusaurus 3 Best Practices for Large Content & MDX Integration**:
    *   **Goal**: Understand optimal structure for 13 weeks of content, efficient MDX rendering, and static asset management.
    *   **Focus**: Sidebar generation, chapter navigation, custom MDX components, integrating Tailwind CSS with Docusaurus themes.
2.  **RAG Integration Strategies (Gemini/Qdrant/FastAPI)**:
    *   **Goal**: Design the RAG pipeline for content ingestion, chunking, embedding, vector storage, retrieval, and prompt construction.
    *   **Focus**: Optimal chunk size/overlap, Qdrant collection setup, Gemini embedding models, FastAPI endpoint design for RAG queries.
3.  **Better Auth Integration for User Management & Custom Survey**:
    *   **Goal**: Implement secure user registration/login and store custom software/hardware background survey data with Neon Postgres.
    *   **Focus**: Better Auth API integration, schema design for user profiles/survey data, handling authentication tokens.
4.  **Personalization & Translation Logic with Gemini API**:
    *   **Goal**: Determine the most effective prompt engineering techniques for Gemini 1.5 Flash/Pro to rewrite content (simpler/harder) and translate to Urdu accurately.
    *   **Focus**: Contextual prompting based on user profile, maintaining fidelity in translation, handling long text segments.
5.  **Reusable Claude Code Subagents Design**:
    *   **Goal**: Outline architecture and implementation patterns for quiz generator, summary, and diagram explainer subagents.
    *   **Focus**: Claude Agent SDK usage, defining agent prompts, input/output contracts, integration with Docusaurus components.
6.  **Search Integration (Docusaurus & RAG)**:
    *   **Goal**: Evaluate Docusaurus's built-in search vs. integrating RAG for enhanced search capabilities across the textbook.
    *   **Focus**: Algolia DocSearch configuration or custom RAG-powered search.
7.  **Dashboard Homepage Patterns**:
    *   **Goal**: Design an engaging and informative homepage for authenticated users, possibly displaying progress or personalized recommendations.
    *   **Focus**: User experience, data visualization, calls to action for content exploration.
8.  **Metadata Schema Design for Chapters & User Profiles**:
    *   **Goal**: Define comprehensive metadata structures for chapters (title, week, module, keywords) and user profiles (auth data, background survey, personalization preferences).
    *   **Focus**: Ensuring all personalization/translation logic has necessary contextual data.
9.  **Build Pipeline & Deployment Strategy**:
    *   **Goal**: Establish CI/CD workflows for frontend (GitHub Pages) and backend (Render/Vercel).
    *   **Focus**: GitHub Actions for Docusaurus build/deploy, Dockerization for FastAPI, environment variable management for secrets.

## Phase 1: Design & Contracts

### Data Model (`specs/1-ai-native-textbook/data-model.md`)

```markdown
# Data Model: AI-Native Textbook

## Entities

### User
*   **id**: UUID (Primary Key)
*   **email**: String (Unique)
*   **password_hash**: String
*   **created_at**: Timestamp
*   **last_login_at**: Timestamp
*   **profile_id**: UUID (Foreign Key to UserProfile)

### UserProfile
*   **id**: UUID (Primary Key)
*   **user_id**: UUID (Foreign Key to User, Unique)
*   **name**: String
*   **software_background**: String (e.g., "Beginner", "Intermediate Python", "Advanced JavaScript")
*   **hardware_background**: String (e.g., "Familiar with Arduino", "Experienced in ROS", "Novice")
*   **learning_pace_preference**: String (e.g., "Fast", "Moderate", "Slow")
*   **preferred_language**: String (e.g., "en", "ur")
*   **personalized_content_difficulty**: String (e.g., "simpler", "standard", "harder")

### Module
*   **id**: UUID (Primary Key)
*   **title**: String
*   **description**: Text
*   **order**: Integer

### Chapter
*   **id**: UUID (Primary Key)
*   **module_id**: UUID (Foreign Key to Module)
*   **title**: String
*   **slug**: String (URL friendly identifier)
*   **content_path**: String (Path to original MDX file)
*   **week_number**: Integer
*   **original_language**: String (e.g., "en")
*   **keywords**: Array of Strings
*   **reading_time_minutes**: Integer

### GlossaryEntry
*   **id**: UUID (Primary Key)
*   **term**: String (Unique)
*   **definition**: Text
*   **chapter_id**: UUID (Optional Foreign Key to Chapter, for context)

### HardwareConfiguration
*   **id**: UUID (Primary Key)
*   **name**: String
*   **description**: Text
*   **components**: JSON (e.g., `{"cpu": "Raspberry Pi 4", "sensor": "Lidar"}`)

### Assessment
*   **id**: UUID (Primary Key)
*   **chapter_id**: UUID (Foreign Key to Chapter)
*   **type**: String (e.g., "quiz", "exercise")
*   **questions**: JSON (Structure for questions and answers)
*   **user_scores**: JSON (Map user_id to score)

### RAGIndex
*   **id**: UUID (Primary Key)
*   **chapter_id**: UUID (Foreign Key to Chapter)
*   **text_chunk**: Text (Original chunk of text)
*   **embedding**: Vector (Qdrant vector ID or direct embedding)
*   **metadata**: JSON (Source, page number, etc.)

### SubagentSkill
*   **id**: UUID (Primary Key)
*   **name**: String (e.g., "quiz_generator", "summary_agent")
*   **description**: Text
*   **api_endpoint**: String (Internal API endpoint for the agent)

## Relationships and State Transitions

*   **User** has one **UserProfile**.
*   **Module** has many **Chapters**.
*   **Chapter** can have many **RAGIndex** entries.
*   **Chapter** can have many **Assessments**.
*   **UserProfile** influences **Chapter** content state (original -> personalized -> translated).
*   **RAGIndex** is populated during content ingestion and used by the Chatbot.
*   **SubagentSkill** provides services to **Chapter** buttons and Chatbot.

## Contracts (`specs/1-ai-native-textbook/contracts/`)

### `chapter-metadata.json` (JSON Schema for chapter frontmatter/metadata)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Chapter Metadata",
  "description": "Schema for Docusaurus MDX chapter frontmatter and additional metadata.",
  "type": "object",
  "required": ["id", "title", "week_number", "module_id", "original_language"],
  "properties": {
    "id": { "type": "string", "format": "uuid" },
    "title": { "type": "string", "description": "The title of the chapter." },
    "slug": { "type": "string", "description": "URL-friendly slug for the chapter." },
    "week_number": { "type": "integer", "description": "The week number this chapter belongs to." },
    "module_id": { "type": "string", "format": "uuid", "description": "ID of the module this chapter belongs to." },
    "original_language": { "type": "string", "description": "ISO 639-1 code for the original language (e.g., 'en')." },
    "keywords": { "type": "array", "items": { "type": "string" } },
    "reading_time_minutes": { "type": "integer" }
  },
  "additionalProperties": false
}
```

### `user-profile.json` (JSON Schema for user profile data)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "User Profile",
  "description": "Schema for user-specific profile and survey data.",
  "type": "object",
  "required": ["user_id", "software_background", "hardware_background"],
  "properties": {
    "user_id": { "type": "string", "format": "uuid", "description": "Associated user ID." },
    "name": { "type": "string" },
    "software_background": {
      "type": "string",
      "enum": ["Beginner", "Intermediate Python", "Advanced JavaScript", "Experienced in ROS", "Other"],
      "description": "User's self-declared software background."
    },
    "hardware_background": {
      "type": "string",
      "enum": ["Novice", "Familiar with Arduino", "Experienced in ROS", "Other"],
      "description": "User's self-declared hardware background."
    },
    "learning_pace_preference": {
      "type": "string",
      "enum": ["Fast", "Moderate", "Slow"],
      "default": "Moderate",
      "description": "User's preferred learning pace."
    },
    "preferred_language": {
      "type": "string",
      "enum": ["en", "ur"],
      "default": "en",
      "description": "User's preferred content language."
    },
    "personalized_content_difficulty": {
      "type": "string",
      "enum": ["simpler", "standard", "harder"],
      "default": "standard",
      "description": "Difficulty level for personalized content."
    }
  },
  "additionalProperties": false
}
```

### `api-routes.json` (JSON Schema for FastAPI API endpoints)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "FastAPI Routes",
  "description": "Schema for documenting FastAPI backend API endpoints.",
  "type": "object",
  "properties": {
    "/api/auth/signup": {
      "type": "object",
      "description": "User registration endpoint.",
      "properties": {
        "method": { "type": "string", "enum": ["POST"] },
        "request_body": { "$ref": "#/definitions/UserSignupRequest" },
        "responses": { "201": { "$ref": "#/definitions/UserResponse" } }
      }
    },
    "/api/auth/login": { /* ... similar structure ... */ },
    "/api/user/profile": {
      "type": "object",
      "description": "Retrieve or update user profile.",
      "properties": {
        "method": { "type": "string", "enum": ["GET", "PUT"] },
        "responses": { "200": { "$ref": "#/definitions/UserProfileResponse" } }
      }
    },
    "/api/chapter/{chapter_id}/personalize": {
      "type": "object",
      "description": "Personalize chapter content based on user profile.",
      "properties": {
        "method": { "type": "string", "enum": ["POST"] },
        "parameters": {
          "chapter_id": { "type": "string", "format": "uuid" }
        },
        "request_body": { "type": "object", "properties": { "content": { "type": "string" } } },
        "responses": { "200": { "type": "object", "properties": { "personalized_content": { "type": "string" } } } }
      }
    },
    "/api/chapter/{chapter_id}/translate": {
      "type": "object",
      "description": "Translate chapter content to a target language (e.g., Urdu).",
      "properties": {
        "method": { "type": "string", "enum": ["POST"] },
        "parameters": {
          "chapter_id": { "type": "string", "format": "uuid" }
        },
        "request_body": { "type": "object", "properties": { "content": { "type": "string" }, "target_language": { "type": "string" } } },
        "responses": { "200": { "type": "object", "properties": { "translated_content": { "type": "string" } } } }
      }
    },
    "/api/chatbot/query": {
      "type": "object",
      "description": "RAG chatbot query endpoint, constrained to selected text.",
      "properties": {
        "method": { "type": "string", "enum": ["POST"] },
        "request_body": { "$ref": "#/definitions/ChatbotQueryRequest" },
        "responses": { "200": { "$ref": "#/definitions/ChatbotResponse" } }
      }
    },
    "/api/subagent/{agent_name}/execute": { /* ... for quiz, summary, diagram explainer ... */ }
  },
  "definitions": {
    "UserSignupRequest": { /* ... */ },
    "UserResponse": { /* ... */ },
    "UserProfileResponse": { /* ... */ },
    "ChatbotQueryRequest": {
      "type": "object",
      "required": ["query", "selected_text"],
      "properties": {
        "query": { "type": "string" },
        "selected_text": { "type": "string", "description": "The text selected by the user, for RAG context." }
      }
    },
    "ChatbotResponse": {
      "type": "object",
      "properties": {
        "answer": { "type": "string" },
        "sources": { "type": "array", "items": { "type": "string" } }
      }
    }
  }
}
```

### `sidebar-config.ts` (TypeScript types for Docusaurus sidebar configuration)

```typescript
// src/types/sidebar-config.ts

export interface SidebarItem {
  type: 'doc' | 'category' | 'link';
  label: string;
  id?: string; // For docs
  items?: SidebarItem[]; // For categories
  href?: string; // For links
  customProps?: { // Custom props for personalization/translation
    weekNumber?: number;
    moduleId?: string;
  };
}

export interface Sidebar {
  [sidebarId: string]: SidebarItem[];
}

// Example usage:
// const mySidebar: Sidebar = {
//   tutorialSidebar: [
//     { type: 'doc', id: 'intro', label: 'Introduction' },
//     {
//       type: 'category',
//       label: 'Week 1',
//       items: [
//         { type: 'doc', id: 'chapter-1-1', label: 'Chapter 1.1', customProps: { weekNumber: 1 } },
//       ],
//     },
//   ],
// };
```

### `react-components.ts` (TypeScript types for custom React components)

```typescript
// src/types/react-components.ts

import { ReactNode } from 'react';

export interface PersonalizeButtonProps {
  chapterId: string;
  initialContent: string;
  onContentPersonalized: (newContent: string) => void;
}

export interface TranslateButtonProps {
  chapterId: string;
  initialContent: string;
  targetLanguage: string; // e.g., 'ur'
  onContentTranslated: (newContent: string) => void;
}

export interface ChatbotProps {
  userId: string;
  chapterId: string;
  selectedText: string; // Dynamic based on user selection
}

export interface AuthFormProps {
  onLoginSuccess?: (userId: string) => void;
  onSignupSuccess?: (userId: string) => void;
  onSurveyComplete?: (profileData: any) => void;
}

export interface BackgroundSurveyFormProps {
  userId: string;
  onSurveyComplete: (profileData: any) => void;
}

export interface QuizGeneratorAgentProps {
  chapterContent: string;
  onQuizGenerated: (quiz: any) => void;
}

export interface SummaryAgentProps {
  chapterContent: string;
  onSummaryGenerated: (summary: string) => void;
}

export interface DiagramExplainerAgentProps {
  diagramDescription: string; // Or image URL
  onExplanationGenerated: (explanation: string) => void;
}

// Additional types for RAG chatbot messages, user profile data, etc.
```

## Quickstart Guide (`specs/1-ai-native-textbook/quickstart.md`)

```markdown
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

## Post-Phase 1: Agent Context Update

A `post-phase1-agent-context-update.sh` script will be created to update agent context files (`CLAUDE.md`, `GEMINI.md`) with the finalized technical stack details.

```bash
#!/bin/bash
# post-phase1-agent-context-update.sh

AGENT_CONTEXT_DIR=".specify/memory"

# Update CLAUDE.md
CLAUDE_FILE="${AGENT_CONTEXT_DIR}/CLAUDE.md"
echo "Updating ${CLAUDE_FILE} with current technical stack..."
# Example: Using sed to update a specific section or append
# This is a placeholder; actual implementation depends on CLAUDE.md structure
# It should add the refined tech stack from this plan.
# For now, a simplified append.
{
  echo -e "
---"
  echo "## Updated Technical Stack (from 1-ai-native-textbook plan)"
  echo "Frontend: Docusaurus 3, React, MDX, Tailwind CSS"
  echo "Backend: FastAPI, Python 3.11+, Uvicorn"
  echo "Database: Neon Serverless Postgres (User data), Qdrant Cloud Free (Vector DB)"
  echo "AI/LLM: Gemini 1.5 Flash/Pro (via Google Generative AI SDK)"
  echo "Auth: Better Auth"
  echo "Deployment: GitHub Pages (Frontend), Render/Vercel (Backend)"
  echo "Development: Spec-Kit Plus, Claude Code"
} >> "${CLAUDE_FILE}"
echo "Updated ${CLAUDE_FILE}."

# Update GEMINI.md
GEMINI_FILE="${AGENT_CONTEXT_DIR}/GEMINI.md"
echo "Updating ${GEMINI_FILE} with current technical stack..."
{
  echo -e "
---"
  echo "## Updated Technical Stack (from 1-ai-native-textbook plan)"
  echo "Frontend: Docusaurus 3, React, MDX, Tailwind CSS"
  echo "Backend: FastAPI, Python 3.11+, Uvicorn"
  echo "Database: Neon Serverless Postgres (User data), Qdrant Cloud Free (Vector DB)"
  echo "AI/LLM: Gemini 1.5 Flash/Pro (via Google Generative AI SDK)"
  echo "Auth: Better Auth"
  echo "Deployment: GitHub Pages (Frontend), Render/Vercel (Backend)"
  echo "Development: Spec-Kit Plus, Claude Code"
} >> "${GEMINI_FILE}"
echo "Updated ${GEMINI_FILE}."

echo "Agent context update script completed."
```

## Phase 2: Task Breakdown

*(Note: `/sp.tasks` will execute this phase based on the spec and this plan. This section provides a high-level grouping.)*

### P1: Book Structure & Content Ingestion (Focus: FR-001, FR-002, SC-001)

*   Setup Docusaurus 3 project.
*   Configure Docusaurus to use existing chapter specs as MDX pages.
*   Implement custom Docusaurus theme with Tailwind CSS.
*   Develop content ingestion script to convert chapter specs to MDX and extract metadata.
*   Implement Docusaurus sidebar navigation for 13 weeks of content.

### P2: RAG Chatbot Integration (Focus: FR-008, FR-009, SC-005, SC-007)

*   Setup FastAPI backend project.
*   Integrate Qdrant Cloud for vector storage.
*   Implement content chunking and embedding logic using Gemini API.
*   Develop RAG indexing script to populate Qdrant from MDX chapters.
*   Create FastAPI endpoint for chatbot queries, performing vector search and Gemini generation.
*   Develop React component for the embedded chatbot in Docusaurus.
*   Implement logic to extract selected text for RAG context.

### P3: Authentication & Personalization (Focus: FR-003, FR-004, FR-006, FR-010, SC-002, SC-003, SC-006)

*   Integrate Better Auth for user registration and login with Neon Postgres.
*   Develop FastAPI endpoints for user authentication and profile management.
*   Create custom signup flow to include the 4-question software/hardware background survey.
*   Implement React components for login, signup, and survey forms.
*   Develop FastAPI endpoint for chapter personalization using Gemini API, adapting content based on user profile.
*   Implement "Personalize for me" button in Docusaurus React components.

### P4: Translation & Subagents (Focus: FR-005, FR-007, SC-004, SC-006)

*   Develop FastAPI endpoint for chapter translation to Urdu using Gemini API.
*   Implement "اردو میں پڑھیں" button in Docusaurus React components.
*   Design and implement reusable Claude Code subagents (quiz generator, summary, diagram explainer).
*   Create FastAPI endpoints to expose Claude Code subagents.
*   Integrate subagent functionality with Docusaurus components (e.g., a "Generate Quiz" button).

## Success Criteria Mapping

| Success Criterion | Design Elements / Outcomes                                                    | Setup / Capstone                                           | Estimates / Rubrics | Prerequisite Graph / Incremental Publishing |
|-------------------|-------------------------------------------------------------------------------|------------------------------------------------------------|---------------------|---------------------------------------------|
| SC-001            | Docusaurus configuration, MDX chapter rendering, navigation links.              | Docusaurus project setup, content ingestion pipeline.      | Covered by P1       | P1 is foundational for all other content.   |
| SC-002            | Better Auth integration, user profile schema, survey UI.                      | Better Auth setup, Neon Postgres schema.                   | Covered by P3       | P3 requires basic Docusaurus setup (P1).    |
| SC-003            | Personalization FastAPI endpoint, Gemini prompt engineering, user profile data utilization. | Gemini API integration, user profile storage.              | Covered by P3       | P3 depends on P1 (chapter content) and Auth. |
| SC-004            | Translation FastAPI endpoint, Gemini API, content display.                    | Gemini API integration, content rendering.                 | Covered by P4       | P4 depends on P1 (chapter content).         |
| SC-005            | RAG pipeline (chunking, embedding, retrieval), chatbot API, UI interaction.   | Qdrant setup, FastAPI RAG service.                         | Covered by P2       | P2 depends on P1 (content for RAG index).   |
| SC-006            | User testing & feedback, qualitative assessment of content relevance.         | User acceptance testing, feedback mechanisms.              | Throughout          | Continuous feedback loop.                   |
| SC-007            | Chatbot context adherence, RAG evaluation metrics.                            | RAG unit/integration tests, specific test cases.           | Covered by P2       | P2 testing for RAG accuracy.                |

## Next Steps

1.  **Review and Approve Plan**: User to review `specs/1-ai-native-textbook/plan.md`.
2.  **Generate Artifacts**: Run the `post-phase1-agent-context-update.sh` script to update agent context.
3.  **Execute Tasks**: Once approved, execute `/sp.tasks` to generate the detailed task breakdown based on this plan.

## Plan Status

**Status**: Ready for Review and Approval

**Next Command**:
*   To proceed with task generation: `/sp.tasks`
*   To refine the plan with further questions: `/sp.clarify`
*   To generate the PHR: use `/sp.phr` after this plan is finalized.
