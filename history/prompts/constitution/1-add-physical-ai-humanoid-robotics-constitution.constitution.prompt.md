---
id: 1
title: Add Physical AI & Humanoid Robotics Constitution
stage: constitution
date: 2025-12-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: none
branch: master
user: unknown
command: /sp.constitution
labels: ["textbook", "physical-ai", "humanoid-robotics", "constitution", "hackathon"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
- .specify/memory/constitution.md
tests:
null
---

## Prompt

```text
/sp.constitution

You are writing the master constitution for a complete AI-Native technical textbook titled:

**“Physical AI & Humanoid Robotics — A Full Coursebook”**

This book is being created for the **Panaversity Hackathon**, where scoring depends on:
- AI-native textbook structure using Spec-Kit Plus
- Integration with Claude Code + Gemini (through claude-code-router)
- Docusaurus publication
- RAG chatbot attached to book content
- Personalization & translation features
- Use of agent skills & subagents

Generate a **complete, extremely detailed Constitution** that defines the ENTIRE book project.

The Constitution must include:

1. **Book Title & Subtitle**
2. **High-level Purpose of the Textbook**
3. **Target Audience**
   (O/A level students, undergrads, robotics beginners, engineers, makers, AI developers)
4. **Prerequisites**
   (Math, physics, programming, electronics, AI/ML knowledge levels)
5. **Course Philosophy**
   - Physical AI definition
   - AI–robot synergy
   - Why humanoid robotics matters
   - Why Physical AI is the future of work
6. **12-Week Full Course Structure**
7. **Learning Outcomes (15 items, measurable, graduate-level)**
8. **Complete Module Breakdown**
   - 6–8 modules
   - Each module 3–6 chapters
   - Each chapter 1500–3000 words expected
9. **Pedagogy & Teaching Style**
   - AI-native
   - Interactive RAG
   - Diagrams, pseudocode, hardware schematics
   - Hands-on physical robotics activities
10. **AI-Native Features**
    - RAG usage
    - Personalized content
    - Urdu translation
    - Claude Code Subagents
    - Agent Skills
    - Book chatbot API workflows
11. **Tools & Technologies**
    - Docusaurus
    - Spec-Kit Plus
    - Claude Code + Gemini API
    - Neon Serverless Postgres
    - Qdrant Vector DB
    - FastAPI backend
    - Better-Auth
    - GitHub Pages deployment
12. **Output Format**
    Return everything in clean, structured **YAML** with sections:
    - title
    - purpose
    - audience
```

## Response snapshot

```text
Generated a complete and detailed constitution for the "Physical AI & Humanoid Robotics — A Full Coursebook" textbook project in YAML format, addressing all specified sections including book title, purpose, audience, prerequisites, course philosophy, structure, learning outcomes, module breakdown, pedagogy, AI-native features, tools & technologies, and governance. The constitution was written to `.specify/memory/constitution.md` with version 1.0.0.
```

## Outcome

- ✅ Impact: Initial constitution generated and saved.
- 🧪 Tests: N/A
- 📁 Files: Updated .specify/memory/constitution.md
- 🔁 Next prompts: User review and approval of constitution, then proceed to /sp.spec
- 🧠 Reflection: Successfully generated a detailed YAML constitution as per user requirements for the 'Physical AI & Humanoid Robotics' textbook project. Handled the bash script failure by falling back to agent-native PHR creation. Confirmed adherence to all specified sections and output format.

## Evaluation notes (flywheel)

- Failure modes observed: Bash script `.specify/scripts/bash/create-phr.sh` not found or executable.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment: Investigate environment for shell script execution issues or ensure `create-phr.sh` is provided and executable.
