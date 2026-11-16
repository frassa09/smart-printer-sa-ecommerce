import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cardapio } from "./tabs/Cardapio";
import { Reservas } from "./tabs/Reservas";
import { AdminUsers } from "../components/AdminUsers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/cardapio" element={<Cardapio></Cardapio>}></Route>
        <Route path="/" element={<Reservas></Reservas>}></Route>
        <Route
          path="/employees"
          element={
            <AdminUsers></AdminUsers>
             
           
          }
          />
      </Routes>
    </BrowserRouter>
  );
}
