import { Calendar, PaperBag, User } from "lucide-react";
import { Profiler } from "react";

export const Header = ({ qtdItens = 2, valor = 140.82 }) => {
  return (
    <div className="flex h-25 w-full items-center justify-between px-6 bg-amber-50 border-b">
      <div className="">
        <p className="font-serif">Restaurante Legal</p>
      </div>
      <div>
        <ul className="flex flex-row gap-5">
          <li className="font-serif">1. Mesa e Data</li>
          <li className="font-serif">2. Cardápio Antecipado</li>
        </ul>
      </div>
      <div>
        <div className="flex flex-row items-center gap-5">
          <div className="flex flex-row gap-2">
            <Calendar></Calendar>
            <p className="font-serif">Minhas reservas</p>
          </div>
          <div className="flex flex-row gap-2 border bg-white p-1 rounded-md">
            <PaperBag color="#E46F45"></PaperBag>
            <code>
              {qtdItens} itens - R$ {valor}
            </code>
          </div>
          <div className="bg-[#E46F45] p-1 rounded-xl">
            <User color="white"></User>
          </div>
        </div>
      </div>
    </div>
  );
};
