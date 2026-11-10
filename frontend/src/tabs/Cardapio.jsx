import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { ReservaAlert } from "../../components/ReservaAlert";
import { ProductBox } from "../../components/ProductBox";
import CarrinhoModal from "../../components/CarrinhoModal";

const CATEGORIES = [
  { id: "todos", label: "Todos" },
  { id: "ENTRADA", label: "Entradas" },
  { id: "PRATO_PRINCIPAL", label: "Pratos Principais" },
  { id: "SOBREMESA", label: "Sobremesas" },
];

export const Cardapio = () => {
  const [reserva, setReserva] = useState("");
  const [categorySelected, setCategorySelected] = useState("todos");
  const [cardapioItems, setCardapioItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [itensPedido, setItensPedido] = useState([[], 0]);

  const receberPedido = (pedido) => {
    const arrayItens = itensPedido[0];
    let valorTotal = 0;

    console.log(pedido);

    const indexExistente = arrayItens.findIndex(
      (item) => item.id === pedido.id,
    );

    if (indexExistente !== -1) {
      pedido.qtd === 0
        ? arrayItens.splice(indexExistente, 1)
        : (arrayItens[indexExistente] = pedido);

      console.log(arrayItens);
    } else {
      arrayItens.push(pedido);
      console.log(arrayItens);
    }

    for (const item of arrayItens) {
      valorTotal += Number((Number(item.preco) * Number(item.qtd)).toFixed(2));
    }

    setItensPedido([[...arrayItens], valorTotal]);
  };

  useEffect(() => {
    fetch("http://localhost:3000/cardapio")
      .then((res) => res.json())
      .then((data) => {
        // Validação defensiva de boa prática: só define o estado se for um Array
        if (Array.isArray(data)) {
          setCardapioItems(data);
          console.log(data);
        } else {
          console.error("Servidor retornou um formato inesperado:", data);
          setCardapioItems([]);
        }
      })
      .catch((err) => {
        console.error("Erro ao carregar o cardápio:", err);
        setCardapioItems([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Garante que a variável usada no filter seja sempre um array seguro
  const safeItems = Array.isArray(cardapioItems) ? cardapioItems : [];

  const filteredItems =
    categorySelected === "todos"
      ? safeItems
      : safeItems.filter((item) => item.category === categorySelected);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff7ff]">
      <Header qtdItens={itensPedido[0].length} valor={itensPedido[1]} />
      <main className="flex flex-col">
        <div>{reserva ? <ReservaAlert /> : null}</div>

        <div className="m-7">
          <h1 className="font-['coolvetica'] text-4xl">Cardápio Antecipado</h1>
          <p className="font-['coolvetica'] mt-3">
            Escolha entre os deliciosos itens de nosso cardápio que são
            preparados com todo o cuidado e carinho
          </p>
        </div>

        {/* Abas de Categoria */}
        <div className="m-7 border-b-2 border-[#C8C5CA]">
          <ul className="flex flex-row gap-5 mb-2">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className={
                  categorySelected === cat.id
                    ? "font-['coolvetica'] justify-center text-white bg-[#303033] p-2 rounded cursor-pointer"
                    : "font-['coolvetica'] justify-center p-2 rounded cursor-pointer"
                }
                onClick={() => setCategorySelected(cat.id)}
              >
                {cat.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex m-7 flex-row">
          {/* Grade de Produtos */}
          <div className=" flex max-w-[80%] flex-wrap gap-6 justify-start">
            {loading ? (
              <p className="font-['coolvetica']">Carregando cardápio...</p>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                const itemNoPedido = itensPedido[0].find(
                  (i) => i.id === item.id,
                );

                const qtdAtual = itemNoPedido ? itemNoPedido.qtd : 0;

                return (
                  <ProductBox
                    qtdAtual={qtdAtual}
                    key={item.id}
                    id={item.id}
                    nome={item.title}
                    descricao={item.description}
                    preco={item.price}
                    imagemUrl={item.imageUrl}
                    enviarPedido={receberPedido}
                  />
                );
              })
            ) : (
              <p className="font-['coolvetica'] text-gray-500">
                Nenhum item nesta categoria.
              </p>
            )}
          </div>
          {loading ? null : (
            <div>
              <CarrinhoModal qtd={itensPedido[0].length} itens={itensPedido[0]} atualizarPedido={receberPedido}></CarrinhoModal>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
