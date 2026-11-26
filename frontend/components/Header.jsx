import { Calendar, PaperBag, User, LogOut } from "lucide-react";
import { Profiler, useState, useEffect } from "react";
import { LoginModal } from "./LoginModal";
import { CadastroModal } from "./CadastroModal";
import { Link } from "react-router-dom";
import { formatarMoeda } from "../src/utils/formatarMoeda";

export const Header = ({ qtdItens = 0, valor = 0 }) => {
  const [modalType, setModalType] = useState(null); // null, 'login' ou 'register'
  const [user, setUser] = useState(null);
  const isApp = window.matchMedia("(display-mode: standalone)").matches;

  
  // Função para ler o usuário logado do localStorage
  const loadUserSession = () => {
    const storedUser = localStorage.getItem("@Restaurante:user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };
  
  useEffect(() => {
    loadUserSession();
    // Escuta o evento customizado disparado no login/logout
    window.addEventListener("auth-change", loadUserSession);
    return () => window.removeEventListener("auth-change", loadUserSession);
  }, []);
  
  // Se for PWA, não renderiza nada
  if (isApp) return null;

  const canManageMenu = user?.role === "ADMIN" || (user?.role === "EMPLOYEE" && user?.isActive === true);

  const handleLogout = () => {
    localStorage.removeItem("@Restaurante:token");
    localStorage.removeItem("@Restaurante:user");
    window.dispatchEvent(new Event("auth-change")); // Atualiza o Header na hora
  };

  const closeModal = () => setModalType(null);
  return (
    <div className="flex h-25 z-1000 sticky top-0 w-full items-center justify-between px-6 bg-amber-50 border-[#C8C5CA] border-b">
      <div className="">
        <img
          src="/favicon.ico" 
          alt="Logo Restaurante Legal" 
          className="w-30 h-8 object-contain"
        
        />
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

          {/*  Link para ADMIN ou EMPLOYEE ativo gerenciarem pratos e preços */}
          {canManageMenu && (
            <Link
              className="font-['coolvetica'] text-[#A23E18] font-bold"
              to={"/cardapio/admin"}
            >
             3. Gerenciar Cardápio
            </Link>
          )}

          {/* Botão exclusivo para ADMIN */}
          {user?.role === "ADMIN" && (
            <Link
              className="font-['coolvetica'] text-[#A23E18] font-bold"
              to={"/employees"}
            >
              4. Equipe
            </Link>
          )}

        </ul>
      </div>
      <div>
        {/* Renderização condicional: se logado, mostra nome e sair; senão, o botão de login */}
        {user ? (
          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-row gap-2">
              <Calendar></Calendar>
              <p className="font-['coolvetica']">Minhas reservas</p>
            </div>
            <div className="flex flex-row gap-2 border bg-white p-1 rounded-md">
              <PaperBag color="#A23E18"></PaperBag>
              <code>
                {qtdItens} itens - {formatarMoeda(valor)}
              </code>
            </div>
            <div className="flex items-center gap-3 bg-white border border-gray-500 px-3 py 1 rounded-md shadow-sm">
              {/* <div className="flex flex-col text-left"> */}
              {/* <span className="font-serif text-xs text-gray-500">Olá,</span> */}
              <span className="font-serif text-sm font-bold text-[#303033] truncate max-w-[30]">
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
          </div>
        ) : (
          <button
            onClick={() => setModalType("login")}
            className="bg-[#E46F45] p-1 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
            title="Entrar ou Cadastrar"
          >
            <User color="white" />
          </button>
        )}
      </div>

      {/* Modais acionados pelo estado */}
      <LoginModal
        isOpen={modalType === "login"}
        onClose={closeModal}
        onSwitchToRegister={() => setModalType("register")}
      />

      <CadastroModal
        isOpen={modalType === "register"}
        onClose={closeModal}
        onSwitchToLogin={() => setModalType("login")}
      />
    </div>
  );
};
