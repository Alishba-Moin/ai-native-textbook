# Tasks: AI-Native Textbook Implementation

**Branch**: `1-ai-native-textbook` | **Date**: 2025-12-11 | **Spec**: [specs/1-ai-native-textbook/spec.md](specs/1-ai-native-textbook/spec.md) | **Plan**: [specs/1-ai-native-textbook/plan.md](specs/1-ai-native-textbook/plan.md)

## Phase 1: Setup

- [x] T001 Create Docusaurus 3 project structure in `src/`
- [x] T002 Configure Docusaurus `docusaurus.config.js` with basic settings
- [x] T003 Integrate Tailwind CSS into Docusaurus theme `src/css/tailwind.css` and `tailwind.config.js`
- [x] T004 Initialize FastAPI backend project in `backend/`
- [x] T005 Setup Python Poetry for dependency management in `backend/pyproject.toml`
- [x] T006 Create initial `.env.example` in `backend/.env.example`

## Phase 2: Foundational

- [x] T007 Configure Neon Postgres database connection in `backend/app/core/config.py`
- [x] T008 Initialize Qdrant client connection in `backend/app/core/qdrant_client.py`
- [x] T009 Develop a basic content ingestion script `scripts/ingest_content.py` to process chapter specs
- [x] T010 Create base Dockerfile for FastAPI backend `backend/Dockerfile`
- [x] T011 Implement initial CI/CD workflow for Docusaurus frontend deployment to GitHub Pages `.github/workflows/deploy-frontend.yml`

## Phase 3: P1: Book Structure & Content Ingestion [US4]

**Story Goal**: The platform presents 13 weeks of content, with each chapter specification imported and rendered as an MDX page.
**Independent Test**: A user can browse all 13 weeks of content, and each chapter loads correctly as an MDX page.

- [x] T012 [P] [US4] Configure Docusaurus to load MDX files from `docs/` and parse frontmatter in `docusaurus.config.js`
- [x] T013 [P] [US4] Refine content ingestion script `scripts/ingest_content.py` to convert existing chapter specs to MDX and store in `docs/`
- [x] T013 [P] [US4] Refine content ingestion script `scripts/ingest_content.py` to convert existing chapter specs to MDX and store in `docs/`
- [ ] T014 [US4] Implement Docusaurus sidebar navigation for 13 weeks of content in `src/sidebars.ts`
- [ ] T015 [US4] Create a generic MDX component for chapter display, handling custom metadata `src/components/ChapterLayout.tsx`

## Phase 4: P1: Personalized Learning Experience (Auth & Profile) [US1]

**Story Goal**: A user signs up, provides their software/hardware background, and then can personalize any chapter to their profile (simpler/harder content).
**Independent Test**: A new user can sign up, complete the survey, navigate to a chapter, click "Personalize for me", and observe the chapter content adapting based on their profile.

- [ ] T016 [P] [US1] Implement User model in `backend/app/models/user.py` based on `data-model.md`
- [ ] T017 [P] [US1] Implement UserProfile model in `backend/app/models/user_profile.py` based on `data-model.md`
- [ ] T018 [US1] Integrate Better Auth for user registration and login in `backend/app/api/auth.py`
- [ ] T019 [P] [US1] Create React components for login and signup forms `src/components/AuthForm.tsx`
- [ ] T020 [US1] Create a 4-question software/hardware background survey form `src/components/BackgroundSurveyForm.tsx`
- [ ] T021 [US1] Develop FastAPI endpoint `/api/user/profile` for profile management `backend/app/api/user.py`
- [ ] T022 [US1] Develop FastAPI endpoint `/api/chapter/{chapter_id}/personalize` for content personalization using Gemini `backend/app/api/personalization.py`
- [ ] T023 [US1] Implement "Personalize for me" button component in Docusaurus `src/components/PersonalizeButton.tsx`
- [ ] T024 [US1] Integrate personalization button with chapter display in Docusaurus theme `src/theme/DocItem/Content/index.tsx`

## Phase 5: P1: Multilingual Access (Translation) [US2]

**Story Goal**: A user can translate any chapter into Urdu on demand.
**Independent Test**: A user can navigate to any chapter, click "اردو میں پڑھیں", and see the entire chapter content translated into Urdu.

- [ ] T025 [P] [US2] Develop FastAPI endpoint `/api/chapter/{chapter_id}/translate` for Urdu translation using Gemini `backend/app/api/translation.py`
- [ ] T026 [US2] Implement "اردو میں پڑھیں" button component in Docusaurus `src/components/TranslateButton.tsx`
- [ ] T027 [US2] Integrate translation button with chapter display in Docusaurus theme `src/theme/DocItem/Content/index.tsx`

## Phase 6: P1: Contextual Chatbot Assistance (RAG Chatbot) [US3]

**Story Goal**: A user can interact with an embedded RAG chatbot that provides answers based *only* on the selected text within the chapter.
**Independent Test**: A user selects a paragraph in a chapter, activates the chatbot, asks a question related to the selected text, and receives an answer derived solely from that text.

- [ ] T028 [P] [US3] Implement content chunking and embedding logic using Gemini API `backend/app/services/embedding_service.py`
- [ ] T029 [P] [US3] Develop RAG indexing script `scripts/rag_indexer.py` to populate Qdrant from MDX chapters
- [ ] T030 [US3] Create FastAPI endpoint `/api/chatbot/query` for RAG chatbot queries `backend/app/api/chatbot.py`
- [ ] T031 [US3] Develop React component for the embedded chatbot in Docusaurus `src/components/Chatbot.tsx`
- [ ] T032 [US3] Implement logic to extract selected text for RAG context in Docusaurus frontend `src/utils/text_selection.ts`
- [ ] T033 [US3] Integrate chatbot component with chapter display in Docusaurus theme `src/theme/DocItem/Content/index.tsx`

## Phase 7: P4: Translation & Subagents (Claude Code Reusable Subagents)

**Story Goal**: Implement reusable Claude Code subagents for quiz generation, summarization, and diagram explanation.
**Independent Test**: User can invoke each subagent through the UI and receive relevant output.

- [ ] T034 [P] [US4] Design Claude Code subagent interface for Quiz Generator `backend/app/services/quiz_agent.py`
- [ ] T035 [P] [US4] Design Claude Code subagent interface for Summary Agent `backend/app/services/summary_agent.py`
- [ ] T036 [P] [US4] Design Claude Code subagent interface for Diagram Explainer `backend/app/services/diagram_agent.py`
- [ ] T037 [US4] Create FastAPI endpoints to expose Claude Code subagents `/api/subagent/{agent_name}/execute` `backend/app/api/subagents.py`
- [ ] T038 [US4] Implement Docusaurus React components/buttons to invoke subagents `src/components/SubagentButtons.tsx`

## Final Phase: Polish & Cross-Cutting Concerns

- [ ] T039 Implement comprehensive frontend testing (Jest/React Testing Library) `src/tests/*`
- [ ] T040 Implement comprehensive backend testing (Pytest) `backend/tests/*`
- [ ] T041 Configure code linting (ESLint/Prettier for JS/TS, Black/Flake8 for Python) `.eslintrc.js`, `.prettierrc`, `pyproject.toml`
- [ ] T042 Refine CI/CD workflows for backend deployment (Render/Vercel) `.github/workflows/deploy-backend.yml`
- [ ] T043 Review and update all documentation (README, Quickstart Guide, API Docs) `README.md`, `specs/1-ai-native-textbook/quickstart.md`, `backend/docs/openapi.json`
- [ ] T044 Ensure WCAG AA accessibility compliance for all Docusaurus pages and components
- [ ] T045 Optimize Docusaurus performance (e.g., image optimization, lazy loading) `docusaurus.config.js`

## Dependencies

*   Phase 1 (Setup) -> Phase 2 (Foundational)
*   Phase 2 (Foundational) -> Phase 3 (Book Structure)
*   Phase 3 (Book Structure) -> Phase 4 (Auth & Profile)
*   Phase 3 (Book Structure) -> Phase 5 (Translation)
*   Phase 3 (Book Structure) -> Phase 6 (RAG Chatbot)
*   Phase 3 (Book Structure) -> Phase 7 (Subagents)
*   Phase 4 (Auth & Profile) -> Phase 6 (RAG Chatbot - for user context)
*   Phase 4 (Auth & Profile) -> Phase 5 (Translation - for user language preference)
*   All functional phases can proceed largely in parallel once foundational elements are in place, with inter-phase dependencies as noted.

## Parallel Execution Examples

### P1: Book Structure & Content Ingestion
- Tasks T012 and T013 can be worked on in parallel.

### P1: Personalized Learning Experience (Auth & Profile)
- Tasks T016, T017, and T019 can be worked on in parallel.

### P1: Contextual Chatbot Assistance (RAG Chatbot)
- Tasks T028 and T029 can be worked on in parallel.

### P4: Translation & Subagents (Claude Code Reusable Subagents)
- Tasks T034, T035, and T036 can be worked on in parallel.

## Implementation Strategy

The implementation will follow an MVP-first approach, prioritizing core content delivery (Phase 3), then key AI-native features (Auth, Personalization, Translation, Chatbot - Phases 4, 5, 6), and finally advanced subagents (Phase 7) and cross-cutting concerns. Each user story phase is designed to be independently testable and incrementally deployable, allowing for continuous progress and feedback.

## Tasks Status

**Status**: Generated and Ready for Execution

**Next Command**: Begin executing tasks, starting with Phase 1. Use the TodoWrite tool to track progress.