import React, { useState } from 'react';

interface AuthFormProps {
  type: 'login' | 'signup';
  onSubmit: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  loading: boolean;
  error: string | null;
}

function AuthForm({ type, onSubmit, loading, error }: AuthFormProps): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // Only for signup

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'signup') {
      onSubmit({ email, password, name });
    } else {
      onSubmit({ email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-4 capitalize">{type}</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="mb-3">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          id="password"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {type === 'signup' && (
        <div className="mb-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
}

export default AuthForm;
