import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTokens, setUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axiosInstance';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please write password and email');
      return;
    }

    if (password.length < 6) {
      setError('Short password');
      return;
    }

    try {
      const response = await fetch('/api/user.json');
      const users = await response.json();

      const matchedUser = users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password,
      );

      if (matchedUser) {
        localStorage.setItem('user', JSON.stringify(matchedUser));
        dispatch(setUser(matchedUser));
      } else {
        setError('Incorrect login or password.');
        return;
      }

      const tokenResponse = await axios.post(
        'https://run.mocky.io/v3/8d1199c0-d333-482e-87c1-78ee85010b8e',
        { email, password },
      );
      const { token, refreshToken } = tokenResponse.data;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      dispatch(setTokens({ token, refreshToken }));
      navigate('/home');
    } catch (error) {
      setError('Error logging in.');
    }
  };

  return (
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
      <button type="submit">Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default LoginPage;
