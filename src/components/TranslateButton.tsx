import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

interface TranslateButtonProps {
  chapterId: string;
}

function TranslateButton({ chapterId }: TranslateButtonProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const backendUrl = siteConfig.customFields?.backendUrl || 'http://localhost:8000';

  const [loading, setLoading] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [targetLanguage, setTargetLanguage] = useState('ur'); // Default to Urdu

  const handleTranslate = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${backendUrl}/api/chapter/${chapterId}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ target_language: targetLanguage }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to translate content');
      }

      const data = await response.json();
      setTranslatedContent(data.translated_content);
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
    <div className="translate-button-container mt-4">
      <button
        className="button button--secondary mr-2"
        onClick={handleTranslate}
        disabled={loading}
      >
        {loading ? 'Translating...' : 'اردو میں پڑھیں (Read in Urdu)'}
      </button>
      {error && <p className="text-red-500">Error: {error}</p>}
      {translatedContent && (
        <div className="mt-4 p-4 border rounded bg-gray-50">
          <h3 className="font-bold">Translated Content ({targetLanguage}):</h3>
          <p>{translatedContent}</p>
        </div>
      )}
    </div>
  );
}

export default TranslateButton;
