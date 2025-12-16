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
  echo -e "\n---"
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
  echo -e "\n---"
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