import { Minus, Plus, ReceiptText } from "lucide-react";

export default function CarrinhoModal({ qtd = 0, itens, atualizarPedido }) {



  const modificarPedido = (valor) => {
    switch (valor.currentTarget.value) {
      case "adicionar":
        {
          qtdSincrona.current++;
          setQtd(qtdSincrona.current);
          const objPedido = {
            id: id,
            nome: nome,
            preco: preco,
            qtd: qtdSincrona.current,
          };

          enviarPedido(objPedido);
        }
        break;
      case "subtrair":
        {
          qtdSincrona.current--;
          setQtd(qtdSincrona.current);
          const objPedido = {
            id: id,
            nome: nome,
            preco: preco,
            qtd: qtdSincrona.current,
          };

          enviarPedido(objPedido);
        }
        break;
    }
  };
  return (
    <div className="flex flex-col z-0 border-gray-400 top-30 pb-10 min-h-200 sticky bg-white border-2 w-115 hover:border-[#A23E18] transition-colors duration-200">
      <div className="flex flex-row m-6 border-b-2 pb-3 items-center justify-between border-[#C8C5CA]">
        <div className="flex justify-center gap-2 flex-row">
          <ReceiptText color="#A23E18" size={30}></ReceiptText>
          <p className="font-coolvetica text-2xl">Itens Pré-Selecionados</p>
        </div>
        <code className="bg-[#FFDBCF] p-1 rounded">{qtd} itens</code>
      </div>
      {itens.map((item) => {
        return (
          <div className="m-6 my-0 border-b-[#C8C5CA] border-b-2 pb-2">
            <div className="flex flex-row justify-between">
              <div>
                <p className="font-coolvetica text-xl">{item.nome}</p>
                <code>R$ {item.preco} unid.</code>
              </div>
              <code className="text-xl font-bold">R$ {Number(item.preco) * Number(item.qtd)}</code>
            </div>
            <div>
              <div className="flex flex-row items-center h-8 w-24 rounded justify-between px-1 border border-[#C8C5CA] mt-3 gap-1">
                <Minus size={18}></Minus>
                <code>{item.qtd}</code>
                <Plus size={18}></Plus>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
