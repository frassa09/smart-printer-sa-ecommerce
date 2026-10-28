import { useState } from 'react';

export function CadastroModal({ isOpen, onClose, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    // role: 'CLIENT',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao cadastrar');
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSwitchToLogin();
      }, 1500);
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
          <h1 className="font-['coolvetica'] text-3xl text-center text-[#303033]">Criar Conta</h1>

          {error && <p className="text-sm text-red-500 text-center font-serif">{error}</p>}
          {success && <p className="text-sm text-green-600 text-center font-serif">Cadastrado com sucesso!</p>}

          <input
            type="text"
            name="name"
            placeholder="Nome Completo"
            required
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-2.5 rounded font-serif focus:outline-none focus:border-[#303033]"
          />

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

          {/* <div className="flex flex-col gap-1">
            <label className="text-xs font-serif text-gray-600">Tipo de Perfil</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border border-gray-300 p-2.5 rounded font-serif focus:outline-none focus:border-[#303033] bg-white"
            >
              <option value="CLIENT">Cliente</option>
              <option value="EMPLOYEE">Funcionário</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div> */}

          <button
            type="submit"
            className="bg-[#303033] text-white p-2.5 rounded font-serif hover:bg-opacity-90 transition-all mt-2"
          >
            Cadastrar
          </button>

          <p className="text-center font-serif text-sm mt-2">
            Já tem conta?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-bold underline"
            >
              Faça login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}