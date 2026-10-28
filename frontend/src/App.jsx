import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cardapio } from "./tabs/Cardapio";
import { Reservas } from "./tabs/Reservas";

export default function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/cardapio" element={<Cardapio></Cardapio>}></Route>
        <Route path="/" element={<Reservas></Reservas>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
