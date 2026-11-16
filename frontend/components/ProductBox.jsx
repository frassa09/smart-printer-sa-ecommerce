import { Minus, Plus } from "lucide-react";
import { useRef, useState } from "react";

// Imagem padrão genérica para pratos sem foto cadastrada
const DEFAULT_IMAGE =
  "https://media.istockphoto.com/id/1980276924/vector/no-photo-thumbnail-graphic-element-no-found-or-available-image-in-the-gallery-or-album-flat.jpg?s=612x612&w=0&k=20&c=ZBE3NqfzIeHGDPkyvulUw14SaWfDj2rZtyiKv3toItk=";

export const ProductBox = ({
  qtdAtual,
  id,
  nome,
  descricao,
  preco,
  imagemUrl,
  enviarPedido,
}) => {
  const atualizarPedido = (qtd) => {
    enviarPedido({
      id: id,
      nome: nome,
      preco: preco,
      qtd,
    });
  };

  return (
    <div className="flex flex-col h-auto max-h-200 w-80 border-2 border-gray-400 hover:border-[#A23E18] bg-white transition-colors duration-300">
      <img
        className="max-h-45 object-cover w-full"
        src={imagemUrl || DEFAULT_IMAGE}
        alt={nome || "Prato"}
        onError={(e) => {
          // Se a imagem falhar ao carregar no futuro, substitui pela padrão
          e.target.src = DEFAULT_IMAGE;
        }}
      />
      <div className="flex flex-col flex-1 justify-between p-4">
        <div>
          <div className="flex flex-row justify-between items-start font-coolvetica">
            <p className="text-2xl font-bold leading-tight">{nome}</p>
            <p className="text-xl ml-2 whitespace-nowrap">
              <code>R$ {Number(preco || 0).toFixed(2)}</code>
            </p>
          </div>
          <div className="font-coolvetica mt-3 text-sm text-gray-600">
            <p>{descricao}</p>
          </div>
        </div>

        {qtdAtual > 0 ? (
          <div className="flex w-full border border-[#C8C5CA] self-center flex-row py-3 justify-between px-3 mt-5">
            <button onClick={() => atualizarPedido(qtdAtual - 1)}>
              <Minus className="hover:text-[#A23E18] cursor-pointer transition-colors duration-200" />
            </button>

            <p className="font-coolvetica">{qtdAtual} porções</p>
            <button onClick={() => atualizarPedido(qtdAtual + 1)}>
              <Plus className="hover:text-[#A23E18] cursor-pointer transition-colors duration-200" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => atualizarPedido(qtdAtual + 1)}
            className="flex w-full gap-2 border border-[#C8C5CA] hover:border-[#A23E18] transition-colors duration-300 self-center flex-row justify-center py-3 mt-5 cursor-pointer"
          >
            <Plus />
            <p className="font-coolvetica">Adicionar ao Pedido</p>
          </button>
        )}
      </div>
    </div>
  );
};
