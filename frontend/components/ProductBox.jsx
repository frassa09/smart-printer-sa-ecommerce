import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export const ProductBox = ({
  nome = "produto legal",
  descricao = "descricao do produto legal",
  preco = 300
}) => {
  const [qtd, setQtd] = useState(0);

  return (
    <div className="flex flex-col min-h-75 w-100 border-2 border-gray-400 hover:border-[#A23E18] bg-white transition-colors duration-300">
      <img
        className="max-h-45"
        src="https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk="
      ></img>
      <div>
        <div className="mx-5 mt-3 flex flex-row justify-between font-coolvetica">
          <p className="text-3xl">{nome}</p>
          <p className="text-2xl">
            <code>R${preco}</code>
          </p>
        </div>
        <div className="mx-5 font-coolvetica mt-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            corrupti nihil similique dolorem labore possimus atque placeat sunt
            vero asperiores doloribus maxime accusantium, rem vitae culpa
            dignissimos cumque? Consequuntur, delectus?
          </p>
        </div>
      </div>
      {qtd > 0 ? (
        <div className="flex w-[95%] border border-[#C8C5CA] self-center flex-row py-3 justify-between px-2 mt-5 mb-5">
          <Minus
            className="hover:text-[#A23E18] transition-colors duration-200"
            onClick={() => setQtd(qtd - 1)}
          ></Minus>
          <p className="font-coolvetica">{qtd} porcões</p>
          <Plus
            className="hover:text-[#A23E18] transition-colors duration-200"
            onClick={() => setQtd(qtd + 1)}
          ></Plus>
        </div>
      ) : (
        <button
          onClick={() => setQtd(qtd + 1)}
          className="flex w-[95%] gap-2 border border-[#C8C5CA] hover:border-[#A23E18] transition-colors duration-1000 self-center flex-row justify-center py-3 mx-10 mt-5 mb-5"
        >
          <Plus></Plus>
          <p className="font-coolvetica">Adicionar ao Pedido</p>
        </button>
      )}
    </div>
  );
};
