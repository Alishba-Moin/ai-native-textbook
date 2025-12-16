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
