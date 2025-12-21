import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface SubagentButtonsProps {
  chapterId: string;
  chapterContent: string; // The content of the current chapter
}

function SubagentButtons({ chapterId, chapterContent }: SubagentButtonsProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const backendUrl = siteConfig.customFields?.backendUrl || 'http://localhost:8000';

  const [loading, setLoading] = useState<string | null>(null); // To track which subagent is loading
  const [result, setResult] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [error, setError] = useState<string | null>(null);

  const executeSubagent = async (agentName: string, payload: object) => {
    setLoading(agentName);
    setResult(null);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/subagent/${agentName}/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}` // TODO: Add actual auth
        },
        body: JSON.stringify({ agent_name: agentName, payload: payload }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `Failed to execute ${agentName}`);
      }

      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(`An unknown error occurred while executing ${agentName}`);
      }
    } finally {
      setLoading(null);
    }
  };

  const handleGenerateQuiz = () => {
    executeSubagent("quiz_generator", {
      chapter_id: chapterId,
      chapter_content: chapterContent,
      num_questions: 5,
      difficulty: "medium",
    });
  };

  const handleGenerateSummary = () => {
    executeSubagent("summary_agent", {
      chapter_id: chapterId,
      chapter_content: chapterContent,
      summary_length: "concise",
    });
  };

  const handleExplainDiagram = () => {
    // For diagram explanation, we'd need to provide actual diagram content (e.g., base64 encoded image)
    // For now, this is a placeholder with dummy content.
    executeSubagent("diagram_explainer", {
      chapter_id: chapterId,
      diagram_content_base64: "dummy_diagram_content_base64", // Replace with actual content
      explanation_type: "detailed",
    });
  };

  return (
    <div className="subagent-buttons-container mt-4 flex gap-2">
      <button
        className="button button--info"
        onClick={handleGenerateQuiz}
        disabled={loading === "quiz_generator"}
      >
        {loading === "quiz_generator" ? 'Generating Quiz...' : 'Generate Quiz'}
      </button>
      <button
        className="button button--info"
        onClick={handleGenerateSummary}
        disabled={loading === "summary_agent"}
      >
        {loading === "summary_agent" ? 'Generating Summary...' : 'Generate Summary'}
      </button>
      <button
        className="button button--info"
        onClick={handleExplainDiagram}
        disabled={loading === "diagram_explainer"}
      >
        {loading === "diagram_explainer" ? 'Explaining Diagram...' : 'Explain Diagram'}
      </button>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}

      {result && (
        <div className="mt-4 p-4 border rounded bg-gray-50 w-full">
          <h3 className="font-bold">Subagent Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default SubagentButtons;
