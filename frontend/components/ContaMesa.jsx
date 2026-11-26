import { useState, useEffect } from "react";
import { formatarMoeda } from "../src/utils/formatarMoeda";
import { api } from "../src/services/api";

export function ContaMesa({ tableId, refreshKey }) {
  const [pedidosMesa, setPedidosMesa] = useState([]);
  const [totalMesa, setTotalMesa] = useState(0);
  const [fechando, setFechando] = useState(false);

  const carregarConta = async () => {
    if (!tableId) {
      setPedidosMesa([]);
      setTotalMesa(0);
      return;
    }

    try {
      const res = await api.get(`/orders/table/${tableId}`);
      setPedidosMesa(res.data.orders || []);
      setTotalMesa(res.data.totalTable || 0);
    } catch {
      setPedidosMesa([]);
      setTotalMesa(0);
    }
  };

  useEffect(() => {
    carregarConta();
  }, [tableId, refreshKey]);

  const handleFecharConta = async () => {
    if (!tableId) return;
    setFechando(true);
    try {
      const res = await api.post(`/orders/table/${tableId}/close`);
      alert(res.data.message || "Conta enviada para o caixa!");
      setPedidosMesa([]);
      setTotalMesa(0);
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao fechar conta da mesa.");
    } finally {
      setFechando(false);
    }
  };

  if (!tableId || pedidosMesa.length === 0) return null;

  return (
    <div className="flex flex-col border-gray-400 bg-white border-2 w-115 p-6 mt-4">
      <p className="font-coolvetica text-2xl mb-4">
        Conta Aberta — Mesa {tableId}
      </p>

      <div className="flex flex-col gap-2 mb-4 max-h-56 overflow-y-auto text-sm font-serif">
        {pedidosMesa.map((pedido) => (
          <div key={pedido.id} className="bg-[#F1F1EE] p-3 rounded">
            <div className="flex justify-between font-bold">
              <span>
                Pedido #{pedido.id} ({pedido.User?.name || "Cliente"})
              </span>
              <span>{formatarMoeda(pedido.totalAmount)}</span>
            </div>
            {pedido.OrderItemQuantities?.map((oi) => (
              <p key={oi.id} className="text-xs text-gray-600 mt-0.5">
                {oi.quantity}x {oi.MenuItem?.title}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4 pt-2 border-t border-[#C8C5CA]">
        <span className="font-coolvetica text-xl">Total da Mesa</span>
        <code className="text-xl font-bold">{formatarMoeda(totalMesa)}</code>
      </div>

      <button
        disabled={fechando}
        onClick={handleFecharConta}
        className="w-full bg-[#303033] text-white font-coolvetica text-lg h-11 rounded cursor-pointer hover:opacity-90 disabled:opacity-50"
      >
        {fechando ? "Encerrando..." : "Pedir Conta (Fechar Mesa)"}
      </button>
    </div>
  );
}