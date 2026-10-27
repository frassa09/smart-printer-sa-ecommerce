import { Route, Routes } from "react-router-dom";
import Login from "./tabs/Login";
import { Cardapio } from "./tabs/Cardapio";

export default function App() {
  return (
    <Routes>
      <Route path="/" Component={Cardapio}></Route>
    </Routes>
  );
}
