---
id: 4
title: Chapter Spec: Python Agents to ROS Controllers
stage: spec
date: 2025-12-06
surface: agent
model: claude-sonnet-4-5-20250929
feature: python-agents-ros-controllers
branch: 1-python-agents-ros-controllers
user: unknown
command: /sp.specify
labels: ["chapter-spec", "rclpy", "python-agents", "ros2", "physical-ai", "textbook"]
links:
  spec: specs/1-python-agents-ros-controllers/spec.md
  ticket: null
  adr: null
  pr: null
files:
- specs/1-python-agents-ros-controllers/spec.md
- specs/1-python-agents-ros-controllers/checklists/requirements.md
tests:
null
---

## Prompt

```text
/sp.specify

You are generating a **chapter specification** for the AI-native textbook:

**Title:** Physical AI & Humanoid Robotics — A Full Coursebook
**Focus & Theme:** AI Systems in the Physical World. Embodied Intelligence.
**Goal:** Bridging the gap between the digital brain and the physical body. Students apply AI knowledge to control humanoid robots in simulated and real-world environments.

The book has a **quarter-based structure** with modules:
- Module 1: The Robotic Nervous System (ROS 2)
- Module 2: The Digital Twin (Gazebo & Unity)
- Module 3: The AI-Robot Brain (NVIDIA Isaac™)
- Module 4: Vision-Language-Action (VLA) and Capstone Project

Each module contains multiple chapters; each chapter must include technical content, hands-on exercises, and AI-native augmentation.

---

## **Input Parameters:**
- `module_name` (string): e.g., "Module 1: The Robotic Nervous System (ROS 2)"
- `chapter_title` (string): e.g., "ROS 2 Nodes, Topics, and Services"

---

## **Output Specification (Return JSON)**

{
  "chapter_title": "",
  "module_name": "",
  "summary": "200–300 words overview explaining why this chapter matters for Physical AI & Humanoid Robotics.",
  "learning_objectives": [
    "5–8 measurable outcomes aligned with hackathon scoring criteria"
  ],
  "prerequisites": [
    "Which prior chapters, concepts, or tools are required"
  ],
  "core_topics": [
    {"name": "Topic 1", "description": "Detailed technical description"},
    {"name": "Topic 2", "description": "Detailed technical description"}
  ],
  "subsections": [
    {
      "title": "Subsection Title",
      "description": "Explain in 150–400 words",
      "expected_word_count": 200–400
    }
  ],
  "diagrams": [
    {"id": 1, "type": "mermaid or ASCII diagram", "caption": "Diagram description"},
    {"id": 2, "type": "mermaid or ASCII diagram", "caption": "Diagram description"}
  ],
  "hands_on_exercises": [
    "Practical ROS 2 coding task",
    "Gazebo simulation task",
    "Isaac platform perception task",
    "Unity environment setup task"
  ],
  "integration_with_ai_agents": [
    "Use Claude/Gemini subagents for code generation",
    "Interactive debugging prompts",
    "Agent skill for RAG query answering"
  ],
  "personalization_features": [
    "Adapt examples to user's hardware/software background",
    "On-demand Urdu translation toggle"
  ],
  "capstone_alignment": "Explain how this chapter contributes to the final autonomous humanoid robot project",
  "expected_chapter_word_count": 2000–3000,
  "keywords": ["Physical AI", "Humanoid Robotics", "ROS 2", "Gazebo", "Isaac", "VLA", "Simulation", "AI Agents"]
}

---

## **Requirements:**
1. The chapter specification must fully match the **hackathon requirements** (RAG, personalization, subagents, Agent Skills, Claude+Gemini backend).
2. Include **hands-on labs, code snippets, diagrams, and multi-modal AI integrations**.
3. Highlight **capstone project alignment** for each chapter.
4. Maintain **AI-native structure for Spec-Kit Plus**.
5. Use **JSON output format

module_name = "Module 1: The Robotic Nervous System (ROS 2)"
chapter_title = "Bridging Python Agents to ROS Controllers using rclpy"
```

## Response snapshot

```text
Generated a complete chapter specification for "Bridging Python Agents to ROS Controllers using rclpy" within "Module 1: The Robotic Nervous System (ROS 2)". The specification is in JSON format and includes all required sections. The specification was written to `specs/1-python-agents-ros-controllers/spec.md` and a quality checklist to `specs/1-python-agents-ros-controllers/checklists/requirements.md` (all items passed).
```

## Outcome

- ✅ Impact: Chapter specification generated and saved, and quality checklist created.
- 🧪 Tests: N/A
- 📁 Files: Created specs/1-python-agents-ros-controllers/spec.md and specs/1-python-agents-ros-controllers/checklists/requirements.md
- 🔁 Next prompts: Proceed to /sp.plan for this feature.
- 🧠 Reflection: Successfully generated a detailed JSON chapter specification adhering to all hackathon and output requirements. Manually handled file creation and PHR generation due to script execution issues.

## Evaluation notes (flywheel)

- Failure modes observed: Bash script `.specify/scripts/bash/create-phr.sh` not found or executable. PowerShell script `.specify/scripts/powershell/create-new-feature.ps1` not found or executable.
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment: Investigate environment setup for `pwsh` and `bash` scripts in the `.specify/scripts/` directory to ensure they are executable or modify the agent to use built-in tools for feature creation and PHR generation more robustly.
