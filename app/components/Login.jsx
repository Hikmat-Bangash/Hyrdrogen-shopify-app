// src/components/LoginForm.jsx
import React, {useState} from 'react';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password}),
    });

    if (!response.ok) {
      setError('Login failed. Please check your credentials.');
      return;
    }

    // Handle successful login, e.g., redirect or fetch user data
    window.location.href = '/';
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:{' '}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Login</button>
    </form>
  );
}
import React from 'react';

const Login = () => {
  return (
    <div className="w-screen h-screen bg-yellow-700">
      <div className="w-full h-full"></div>
    </div>
  );
};

export default Login;
