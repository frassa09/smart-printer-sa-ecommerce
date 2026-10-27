import { useState } from "react";
import { Header } from "../../components/Header";
import { ReservaAlert } from "../../components/ReservaAlert";
import { ProductBox } from "../../components/ProductBox";

export const Cardapio = () => {
  const [reserva, setReserva] = useState('');
  const [categorySelected, setCateogorySelected] = useState('todos');

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <Header></Header>
      <main className="flex flex-col">
        <div>{reserva ? <ReservaAlert></ReservaAlert> : null}</div>
        <div className="m-7">
          <h1 className="font-['coolvetica'] text-4xl">Cardápio Antecipado</h1>
          <p className="font-serif mt-3">
            Escolha entre os deliciosos itens de nosso cardápio que são
            preparados com todo o cuidado e carinho
          </p>
        </div>
        <div className="m-7">
          <ul className="flex flex-row gap-5">
            <li
              className={
                categorySelected == "todos"
                  ? "font-serif justify-center text-white bg-[#303033] p-2 rounded"
                  : "font-serif justify-center p-2 rounded"
              }
              data-value={"todos"}
              onClick={(x) => {
                setCateogorySelected(x.target.getAttribute("data-value"));
              }}
            >
              Todos
            </li>
            <li
              className={
                categorySelected == "entradas"
                  ? "font-serif justify-center text-white bg-[#303033] p-2 rounded"
                  : "font-serif justify-center p-2 rounded"
              }
              data-value={"entradas"}
              onClick={(x) => {
                setCateogorySelected(x.target.getAttribute("data-value"));
              }}
            >
              Entradas
            </li>
            <li
              className={
                categorySelected == "pratos-principais"
                  ? "font-serif justify-center text-white bg-[#303033] p-2 rounded"
                  : "font-serif p-2 rounded"
              }
              data-value={"pratos-principais"}
              onClick={(x) => {
                setCateogorySelected(x.target.getAttribute("data-value"));
              }}
            >
              Pratos Principais
            </li>
            <li
              className={
                categorySelected == "sobremesas"
                  ? "font-serif justify-center text-white bg-[#303033] p-2 rounded"
                  : "font-serif p-2 rounded"
              }
              data-value={"sobremesas"}
              onClick={(x) => {
                setCateogorySelected(x.target.getAttribute("data-value"));
              }}
            >
              Sobremesas
            </li>
          </ul>
        </div>
        <div className="m-7">
          <ProductBox></ProductBox>
        </div>
      </main>
    </div>
  );
};
