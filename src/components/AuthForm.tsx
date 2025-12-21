// import React, { useState } from 'react';

// interface AuthFormProps {
//   type: 'login' | 'signup';
//   onSubmit: (data: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
//   loading: boolean;
//   error: string | null;
// }

// function AuthForm({ type, onSubmit, loading, error }: AuthFormProps): JSX.Element {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState(''); // Only for signup

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (type === 'signup') {
//       onSubmit({ email, password, name });
//     } else {
//       onSubmit({ email, password });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="auth-form p-4 border rounded shadow-md">
//       <h2 className="text-xl font-bold mb-4 capitalize">{type}</h2>
//       {error && <p className="text-red-500 mb-2">{error}</p>}

//       <div className="mb-3">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
//         <input
//           type="email"
//           id="email"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//       </div>

//       <div className="mb-3">
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
//         <input
//           type="password"
//           id="password"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//       </div>

//       {type === 'signup' && (
//         <div className="mb-3">
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
//           <input
//             type="text"
//             id="name"
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
//       )}

//       <button
//         type="submit"
//         className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
//         disabled={loading}
//       >
//         {loading ? 'Loading...' : type === 'login' ? 'Login' : 'Sign Up'}
//       </button>
//     </form>
//   );
// }

// export default AuthForm;

import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function AuthForm() {
  const { siteConfig } = useDocusaurusContext();
  const backendUrl = siteConfig.customFields?.backendUrl as string || 'http://localhost:8000';
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || 'Failed');

      // Save token
      localStorage.setItem('authToken', data.access_token);
      setMessage(isLogin ? 'Login successful!' : 'Registration successful!');

      // Reload to update UI
      window.location.reload();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Error');
    } finally {
      setLoading(false);
    }
  };

  const isLoggedIn = !!localStorage.getItem('authToken');

  if (isLoggedIn) {
    return (
      <div className="auth-status">
        <p>Logged in ✅</p>
        <button onClick={() => {
          localStorage.removeItem('authToken');
          window.location.reload();
        }}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <h3>{isLogin ? 'Login' : 'Register'}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}