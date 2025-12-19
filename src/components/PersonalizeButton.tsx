import React, { useState } from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface PersonalizeButtonProps {
  chapterId: string;
}

function PersonalizeButton({ chapterId }: PersonalizeButtonProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const backendUrl = siteConfig.customFields?.backendUrl || 'http://localhost:8000'; // Default to localhost

  const [loading, setLoading] = useState(false);
  const [personalizedContent, setPersonalizedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalize = async () => {
    setLoading(true);
    setError(null);
    try {
      // This is a placeholder for actual authentication and API call
      // In a real app, you'd get a user token and send it in the headers
      // For demonstration, we'll assume a dummy user for now.
      const response = await fetch(`${backendUrl}/api/chapter/${chapterId}/personalize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}` // Example for authenticated request
        },
        // body: JSON.stringify({ userId: 'dummy-user-id' }), // Example body if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to personalize content');
      }

      const data = await response.json();
      setPersonalizedContent(data.personalized_content);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="personalize-button-container mt-4">
      <button
        className="button button--primary mr-2"
        onClick={handlePersonalize}
        disabled={loading}
      >
        {loading ? 'Personalizing...' : 'Personalize for me'}
      </button>
      {error && <p className="text-red-500">Error: {error}</p>}
      {personalizedContent && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold">Personalized Content:</h3>
          <p>{personalizedContent}</p>
        </div>
      )}
    </div>
  );
}

export default PersonalizeButton;
