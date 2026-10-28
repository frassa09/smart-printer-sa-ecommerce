import { Calendar, PaperBag, User } from "lucide-react";
import { Profiler } from "react";
import { Link } from "react-router-dom";

export const Header = ({ qtdItens = 2, valor = 140.82 }) => {
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
          <div className="bg-[#A23E18] p-1 rounded-xl">
            <User color="white"></User>
          </div>
        </div>
      </div>
    </div>
  );
};
