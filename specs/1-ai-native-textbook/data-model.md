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
