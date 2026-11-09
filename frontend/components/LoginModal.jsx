import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao entrar');
      }

      localStorage.setItem('@app:token', data.token);
      localStorage.setItem('@app:user', JSON.stringify(data.user));

      window.dispatchEvent(new Event('auth-change'));

      onClose();
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-black font-bold"
        >
          ✕
        </button>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="font-['coolvetica'] text-3xl text-center text-[#303033]">Entrar</h1>
          
          {error && <p className="text-sm text-red-500 text-center font-serif">{error}</p>}

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            required
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 rounded font-serif focus:outline-none focus:border-[#303033]"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            required
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 rounded font-serif focus:outline-none focus:border-[#303033]"
          />

          <button
            type="submit"
            className="bg-[#303033] text-white p-2.5 rounded font-serif hover:bg-opacity-90 transition-all"
          >
            Entrar
          </button>

          <p className="text-center font-serif text-sm mt-2">
            Não tem conta?{' '}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="font-bold underline"
            >
              Cadastre-se
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}