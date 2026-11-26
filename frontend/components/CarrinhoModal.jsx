import { useState } from "react";
import { CircleDollarSign, Minus, Plus, ReceiptText, Utensils } from "lucide-react";
import { formatarMoeda } from "../src/utils/formatarMoeda";
import { api } from "../src/services/api";

export default function CarrinhoModal({
  qtd = 0,
  itens,
  valorTotal,
  atualizarPedido,
  tableId,
  onChangeTableId,
  onPedidoEnviado,
}) {
  const [notes, setNotes] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleConfirmarPedido = async () => {
    const token = localStorage.getItem("@Restaurante:token");
    if (!token) {
      alert("Faça login para realizar um pedido na mesa.");
      return;
    }
    if (!tableId) {
      alert("Informe o número da mesa antes de confirmar o pedido.");
      return;
    }

    setEnviando(true);
    try {
      await api.post("/orders", {
        tableId: Number(tableId),
        notes,
        items: itens.map((i) => ({
          menuItemId: i.id,
          quantity: i.qtd,
        })),
      });

      setNotes("");
      onPedidoEnviado();
      alert("Pedido enviado para a cozinha!");
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao enviar pedido.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="flex flex-col z-0 border-gray-400 pb-6 bg-white border-2 w-115 hover:border-[#A23E18] transition-colors duration-200">
      {/* Seleção da Mesa */}
      <div className="flex flex-row items-center justify-between mx-6 mt-6 pb-4 border-b border-[#C8C5CA]">
        <div className="flex items-center gap-2">
          <Utensils color="#A23E18" size={22} />
          <label className="font-coolvetica text-lg">Nº da Mesa:</label>
        </div>
        <input
          type="number"
          min="1"
          placeholder="Ex: 1"
          value={tableId}
          onChange={(e) => onChangeTableId(e.target.value)}
          className="w-24 p-1.5 rounded border border-[#C8C5CA] bg-[#F1F1EE] text-center font-bold"
        />
      </div>

      {/* Cabeçalho */}
      <div className="flex flex-row m-6 pb-3 items-center justify-between border-[#C8C5CA]">
        <div className="flex justify-center gap-2 flex-row">
          <ReceiptText color="#A23E18" size={30} />
          <p className="font-coolvetica text-2xl">Itens Pré-Selecionados</p>
        </div>
        <code className="bg-[#FFDBCF] p-1 rounded">{qtd} itens</code>
      </div>

      {itens.map((item) => (
        <div
          key={item.id}
          className="m-6 my-0 animate-fade-in border-t-[#C8C5CA] border-t-2 py-4"
        >
          <div className="flex flex-row justify-between">
            <div>
              <p className="font-coolvetica text-xl">{item.nome}</p>
              <code>{formatarMoeda(item.preco)} unid.</code>
            </div>
            <code className="text-xl">
              {formatarMoeda(Number(item.preco) * Number(item.qtd))}
            </code>
          </div>
          <div className="flex flex-row items-center h-8 w-24 rounded justify-between px-1 border border-[#C8C5CA] mt-3 gap-1">
            <Minus
              size={18}
              className="cursor-pointer"
              onClick={() =>
                item.qtd > 0 ? atualizarPedido(item.id, item.qtd - 1) : null
              }
            />
            <code>{item.qtd}</code>
            <Plus
              size={18}
              className="cursor-pointer"
              onClick={() => atualizarPedido(item.id, item.qtd + 1)}
            />
          </div>
        </div>
      ))}

      {qtd > 0 && (
        <div>
          <div className="flex flex-col m-6 border-b border-b-[#C8C5CA] pb-4">
            <p>Observações do Pedido:</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Desejo retirar feijão do pedido..."
              className="h-18 p-2 mt-2 rounded border border-[#C8C5CA] bg-[#F1F1EE] text-sm text-left"
            />
          </div>

          <div className="flex flex-col m-6 mb-2">
            <div className="flex flex-row justify-between mb-6 items-center">
              <p className="font-coolvetica text-2xl">Subtotal do Pedido</p>
              <code className="text-xl">{formatarMoeda(valorTotal)}</code>
            </div>
            <button
              disabled={enviando}
              onClick={handleConfirmarPedido}
              className="flex flex-row bg-[#A23E18] rounded h-12 justify-center items-center text-white gap-3 cursor-pointer hover:opacity-90 disabled:opacity-50"
            >
              <p className="font-coolvetica text-xl">
                {enviando ? "Enviando..." : "Enviar Pedido para Cozinha"}
              </p>
              <CircleDollarSign />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}