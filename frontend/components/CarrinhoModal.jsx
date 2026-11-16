import { CircleDollarSign, Minus, Plus, ReceiptText } from "lucide-react";
import { formatarMoeda } from "../src/utils/formatarMoeda";

export default function CarrinhoModal({
  qtd = 0,
  itens,
  valorTotal,
  atualizarPedido,
}) {
  const modificarQtdItemPedido = (id, qtd) => {
    atualizarPedido(id, qtd);
  };
  return (
    <div className="flex flex-col z-0 border-gray-400 top-30 pb-10 min-h-200 sticky bg-white border-2 w-115 hover:border-[#A23E18] transition-colors duration-200">
      <div className="flex flex-row m-6 pb-3 items-center justify-between border-[#C8C5CA]">
        <div className="flex justify-center gap-2 flex-row">
          <ReceiptText color="#A23E18" size={30}></ReceiptText>
          <p className="font-coolvetica text-2xl">Itens Pré-Selecionados</p>
        </div>
        <code className="bg-[#FFDBCF] p-1 rounded">{qtd} itens</code>
      </div>
      {itens.map((item, index) => {
        return (
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
            <div>
              <div className="flex flex-row items-center h-8 w-24 rounded justify-between px-1 border border-[#C8C5CA] mt-3 gap-1">
                <Minus
                  size={18}
                  onClick={() =>
                    item.qtd > 0
                      ? modificarQtdItemPedido(item.id, item.qtd - 1)
                      : null
                  }
                ></Minus>
                <code>{item.qtd}</code>
                <Plus
                  size={18}
                  onClick={() => modificarQtdItemPedido(item.id, item.qtd + 1)}
                ></Plus>
              </div>
            </div>
          </div>
        );
      })}

      {qtd ? (
        <div>
          <div className="flex flex-col m-6 border-b border-b-[#C8C5CA] pb-4">
            <p>Observações do Pedido:</p>
            <textarea
              placeholder="Desejo retirar feijão do pedido..."
              className="h-18 p-2 mt-2 rounded border border-[#C8C5CA] bg-[#F1F1EE] text-sm text-left justify"
            ></textarea>
          </div>

          <div className="flex flex-col m-6">
            <div className="flex flex-row justify-between mb-8 items-center">
              <p className="font-coolvetica text-2xl">Total a pagar</p>
              <code className="text-xl">{formatarMoeda(valorTotal)}</code>
            </div>
            <button className="flex flex-row bg-[#A23E18] rounded h-12 justify-center items-center text-white gap-3">
              <p className="font-coolvetica text-xl">
                Confirmar pedido e realizar pagamento
              </p>
              <CircleDollarSign></CircleDollarSign>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
