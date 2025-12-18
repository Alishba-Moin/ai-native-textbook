import React, { useState } from 'react';
import { useHistory } from '@docusaurus/router';

interface BackgroundSurveyFormProps {
  onSubmit: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  loading: boolean;
  error: string | null;
}

const softwareBackgroundOptions = [
  'Beginner (No coding experience)',
  'Intermediate Python (Familiar with Python basics, libraries)',
  'Advanced JavaScript (Experienced with React, Node.js, TypeScript)',
  'Experienced in C++ (Low-level programming, embedded systems)',
  'Other',
];

const hardwareBackgroundOptions = [
  'Novice (Little to no experience with hardware)',
  'Familiar with Arduino (Basic electronics, microcontrollers)',
  'Experienced in ROS (Robot Operating System, robot kinematics)',
  'Experienced with NVIDIA Jetson (Edge AI, embedded vision)',
  'Other',
];

const learningPaceOptions = [
  'Fast (Prefer quick overviews, self-paced deep dives)',
  'Moderate (Structured learning, regular exercises)',
  'Slow (Detailed explanations, step-by-step guidance)',
];

function BackgroundSurveyForm({ onSubmit, loading, error }: BackgroundSurveyFormProps): JSX.Element {
  const [softwareBackground, setSoftwareBackground] = useState('');
  const [hardwareBackground, setHardwareBackground] = useState('');
  const [learningPace, setLearningPace] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('en'); // Default to English
  const history = useHistory();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      software_background: softwareBackground,
      hardware_background: hardwareBackground,
      learning_pace_preference: learningPace,
      preferred_language: preferredLanguage,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="background-survey-form p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Tell us about your background</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-3">
        <label htmlFor="softwareBackground" className="block text-sm font-medium text-gray-700">Software Development Background:</label>
        <select
          id="softwareBackground"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={softwareBackground}
          onChange={(e) => setSoftwareBackground(e.target.value)}
          required
        >
          <option value="">Select an option</option>
          {softwareBackgroundOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="hardwareBackground" className="block text-sm font-medium text-gray-700">Hardware/Robotics Experience:</label>
        <select
          id="hardwareBackground"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={hardwareBackground}
          onChange={(e) => setHardwareBackground(e.target.value)}
          required
        >
          <option value="">Select an option</option>
          {hardwareBackgroundOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="learningPace" className="block text-sm font-medium text-gray-700">Preferred Learning Pace:</label>
        <select
          id="learningPace"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={learningPace}
          onChange={(e) => setLearningPace(e.target.value)}
          required
        >
          <option value="">Select an option</option>
          {learningPaceOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="preferredLanguage" className="block text-sm font-medium text-gray-700">Preferred Language:</label>
        <select
          id="preferredLanguage"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={preferredLanguage}
          onChange={(e) => setPreferredLanguage(e.target.value)}
          required
        >
          <option value="en">English</option>
          <option value="ur">اردو (Urdu)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Survey'}
      </button>
    </form>
  );
}

export default BackgroundSurveyForm;
