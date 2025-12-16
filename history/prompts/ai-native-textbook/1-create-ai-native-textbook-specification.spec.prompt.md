id: 1
title: Create AI-Native Textbook Specification
stage: spec
date: 2025-12-10
surface: agent
model: claude-sonnet-4-5-20250929
feature: ai-native-textbook
branch: 1-ai-native-textbook
user: current_user
command: /sp.specify Create the complete project specification for the Panaversity Hackathon submission titled "Physical AI & Humanoid Robotics – AI-Native Textbook". This is a Docusaurus v3 website deployed to GitHub Pages containing: • 13 weeks of content (already specified in the existing chapter specs) • Fully embedded RAG chatbot (Gemini 1.5 Flash backend) • FastAPI backend with Neon Postgres + Qdrant Cloud • Better Auth login/signup with software/hardware background survey • Per-chapter buttons: "Personalize for me" and "اردو میں پڑھیں" • Reusable Claude Code subagents (quiz generator, summary, diagram explainer) • All existing chapter specs will be imported and rendered as MDX pages Technical stack: - Frontend: Docusaurus 3 + MDX + Tailwind - Backend: FastAPI (hosted on Render/Vercel) - LLM: Gemini 1.5 Flash/Pro (free tier) - Vector DB: Qdrant Cloud Free - Auth & User DB: Better Auth + Neon Serverless Postgres - Development: 100% Spec-Kit Plus + Claude Code (must be visible in demo video): 1. User signs up → asked 4 questions about software/hardware background 2. Every chapter has two buttons at the top 3. "Personalize" rewrites the chapter (simpler/harder) using user profile 4. "اردو میں پڑھیں" translates entire chapter on demand 5. Chatbot can answer from selected text only Use all existing chapter specifications in /specs folder as source of truth for content. Generate complete folder structure, Docusaurus config, FastAPI routes, React components for chatbot/auth/buttons, and deployment instructions.
labels: ["specification", "project-init"]
links:
  spec: specs/1-ai-native-textbook/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/1-ai-native-textbook/spec.md
  - specs/1-ai-native-textbook/checklists/requirements.md
tests: []
---

## Prompt

Create the complete project specification for the Panaversity Hackathon submission titled "Physical AI & Humanoid Robotics – AI-Native Textbook".

This is a Docusaurus v3 website deployed to GitHub Pages containing:

• 13 weeks of content (already specified in the existing chapter specs)

• Fully embedded RAG chatbot (Gemini 1.5 Flash backend)

• FastAPI backend with Neon Postgres + Qdrant Cloud

• Better Auth login/signup with software/hardware background survey

• Per-chapter buttons: "Personalize for me" and "اردو میں پڑھیں"

• Reusable Claude Code subagents (quiz generator, summary, diagram explainer)

• All existing chapter specs will be imported and rendered as MDX pages

Technical stack:

- Frontend: Docusaurus 3 + MDX + Tailwind

- Backend: FastAPI (hosted on Render/Vercel)

- LLM: Gemini 1.5 Flash/Pro (free tier)

- Vector DB: Qdrant Cloud Free

- Auth & User DB: Better Auth + Neon Serverless Postgres

- Development: 100% Spec-Kit Plus + Claude Code

(must be visible in demo video):
1. User signs up → asked 4 questions about software/hardware background
2. Every chapter has two buttons at the top
3. "Personalize" rewrites the chapter (simpler/harder) using user profile
4. "اردو میں پڑھیں" translates entire chapter on demand
5. Chatbot can answer from selected text only

Use all existing chapter specifications in /specs folder as source of truth for content.

Generate complete folder structure, Docusaurus config, FastAPI routes, React components for chatbot/auth/buttons, and deployment instructions.

## Response snapshot

The project specification for "Physical AI & Humanoid Robotics – AI-Native Textbook" has been successfully created.

- **Branch Name**: `1-ai-native-textbook`
- **Specification File**: `specs/1-ai-native-textbook/spec.md`
- **Checklist Results**: All specification quality checks passed.

The specification is ready for the next phase. You can now use `/sp.clarify` to ask targeted clarification questions or `/sp.plan` to begin planning the implementation.

## Outcome

- ✅ Impact: Successfully generated the complete project specification.
- 🧪 Tests: N/A (Specification creation, not code)
- 📁 Files: specs/1-ai-native-textbook/spec.md, specs/1-ai-native-textbook/checklists/requirements.md
- 🔁 Next prompts: /sp.clarify, /sp.plan
- 🧠 Reflection: The spec was created and validated successfully.

## Evaluation notes (flywheel)

- Failure modes observed: Attempted to run a PowerShell script which failed, then a Bash script which also failed due to environment issues. Successfully fell back to agent-native file creation.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A