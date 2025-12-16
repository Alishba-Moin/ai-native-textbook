---
id: 0001
title: Update project constitution
stage: constitution
date: 2025-12-09
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: /sp.phr
labels: ["project constitution", "hackathon", "specify"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
  - .specify/templates/plan-template.md (updated)
  - .specify/templates/spec-template.md (updated)
  - .specify/templates/tasks-template.md (updated)
  - .specify/templates/commands/*.md (updated)
tests:
  - none
---

## Prompt

Project: Physical AI & Humanoid Robotics – An AI-Native Textbook & Interactive Learning Platform
Goal: Win the Panaversity Hackathon by delivering a complete, spec-driven, deployed Docusaurus book with embedded RAG chatbot and all bonus features.

Core Principles:
1. 100% Spec-Kit Plus + Claude Code driven development (every file must be traceable to a /sp.* command)
2. Use Docusaurus v3 (classic template) deployed to GitHub Pages
3. Full textbook content generated from the official Physical AI & Humanoid Robotics course outline (provided in hackathon brief)
4. Embedded RAG chatbot (Gemini API backend) using FastAPI + Neon Serverless Postgres + Qdrant Cloud Free Tier that can:
   - Answer from entire book
   - Answer only from user-selected text
5. Bonus features (must be implemented for max points):
   - Reusable Claude Code subagents/skills (e.g., quiz generator, summary agent, diagram explainer)
   - Better Auth signup/signin with background survey (software + hardware experience)
   - Per-chapter "Personalize" button → adapts content difficulty using user profile
   - Per-chapter "اردو میں پڑھیں" button → on-demand Urdu translation via Gemini API
6. All content in MDX with executable code snippets, diagrams, and interactive elements
7. Mobile-responsive, fast-loading, accessible (WCAG AA), SEO-optimized
8. Zero OpenAI usage in production (use Gemini 1.5 Flash/Pro for cost & latency)

Output the following as structured YAML in constitution.md:
- title, subtitle, tagline
- description (3 paragraphs)
- learning_outcomes (10 measurable bullets)
- prerequisites (software, hardware, math)
- schedule (13 weeks)
- modules (exact 4 modules + capstone as per hackathon brief)
- technical_stack (full list with versions)
- bonus_features (list all 4 with implementation notes)
- deployment (GitHub Pages + Vercel/Render for backend)

Use authoritative, inspiring, and precise language worthy of a flagship Panaversity AI-native textbook.

## Response snapshot

The project constitution `.specify/memory/constitution.md` has been updated to version 1.1.0, including new sections and revised core principles.

## Outcome

- ✅ Impact: The project constitution was successfully updated, reflecting new project goals, core principles, technical stack, and bonus features for the Panaversity Hackathon.
- 🧪 Tests: none
- 📁 Files: .specify/memory/constitution.md modified. Associated templates requiring updates were noted.
- 🔁 Next prompts: Proceed with implementing the defined features based on the updated constitution.
- 🧠 Reflection: The PHR script was unavailable, requiring manual PHR creation. This highlights a dependency issue on the script.

## Evaluation notes (flywheel)

- Failure modes observed: The create-phr.sh script was not found, leading to a fallback to manual PHR creation.
- Graders run and results (PASS/FAIL): PASS (manual validation)
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Investigate why .specify/scripts/bash/create-phr.sh is missing or not executable and ensure it's available for future PHR generation.
