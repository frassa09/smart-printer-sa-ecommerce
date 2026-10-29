import { Calendar, PaperBag, User, LogOut } from "lucide-react";
import { Profiler, useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { CadastroModal } from "./CadastroModal";
import { Link } from "react-router-dom";

export const Header = ({ qtdItens = 2, valor = 140.82 }) => {
  const [modalType, setModalType] = useState(null); // null, 'login' ou 'register'
  const [user, setUser] = useState(null);

  // Função para ler o usuário logado do localStorage
  const loadUserSession = () => {
    const storedUser = localStorage.getItem('@app:user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    loadUserSession();
    // Escuta o evento customizado disparado no login/logout
    window.addEventListener('auth-change', loadUserSession);
    return () => window.removeEventListener('auth-change', loadUserSession);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('@app:token');
    localStorage.removeItem('@app:user');
    window.dispatchEvent(new Event('auth-change')); // Atualiza o Header na hora
  };

  const closeModal = () => setModalType(null);
  return (
    <div className="flex h-25 w-full items-center justify-between px-6 bg-amber-50 border-[#C8C5CA] border-b">
      <div className="">
        <p className="font-['coolvetica']">Restaurante Legal</p>
      </div>
      <div>
        <ul className="flex flex-row gap-5">
          <Link className="font-['coolvetica']" to={"/"}>
            1. Mesa e Data
          </Link>
          <Link className="font-['coolvetica']" to={"/cardapio"}>
            2. Cardápio Antecipado
          </Link>
        </ul>
      </div>
      <div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row gap-2">
            <Calendar></Calendar>
            <p className="font-['coolvetica']">Minhas reservas</p>
          </div>
          <div className="flex flex-row gap-2 border bg-white p-1 rounded-md">
            <PaperBag color="#A23E18"></PaperBag>
            <code>
              {qtdItens} itens - R$ {valor}
            </code>
          </div>


          {/* Renderização condicional: se logado, mostra nome e sair; senão, o botão de login */}
          {user ? (
            <div className="flex items-center gap-3 bg-white border border-gray-500 px-3 py 1 rounded-md shadow-sm">
              {/* <div className="flex flex-col text-left"> */}
                {/* <span className="font-serif text-xs text-gray-500">Olá,</span> */}
                <span className="font-serif text-sm font-bold text-[#303033] truncate max-w-[120px]">
                  {user.name}
                </span>
              {/* </div> */}
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-700 transition-colors p-1 cursor-pointer"
                title="Sair da conta"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
          <button
            onClick={() => setModalType('login')}
            className="bg-[#E46F45] p-1 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            title="Entrar ou Cadastrar"
          >
            <User color="white" />
          </button>
          )}
        </div>
      </div>

        {/* Modais acionados pelo estado */}
      <LoginModal
        isOpen={modalType === 'login'}
        onClose={closeModal}
        onSwitchToRegister={() => setModalType('register')}
      />

      <CadastroModal
        isOpen={modalType === 'register'}
        onClose={closeModal}
        onSwitchToLogin={() => setModalType('login')}
      />

    </div>
  );
};
