import React, { useState } from 'react';
import api from '../api';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/signup', form);
      alert('Signup successful! You can now login.');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        value={form.username}
        required
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={form.email}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
        required
      />
      <button type="submit">Signup</button>
    </form>
  );
}
