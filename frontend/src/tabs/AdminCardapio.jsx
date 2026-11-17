import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { api } from "../services/api";

export const AdminCardapio = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [novoPrato, setNovoPrato] = useState({
    title: "",
    description: "",
    price: "",
    category: "PRATO_PRINCIPAL",
  });

  const [editingId, setEditingId] = useState(null);
  const [editPrice, setEditPrice] = useState("");

  const fetchCardapio = async () => {
    try {
      const res = await api.get("/cardapio");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao carregar cardápio:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardapio();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cardapio/admin", {
        ...novoPrato,
        price: Number(novoPrato.price),
      });
      setNovoPrato({
        title: "",
        description: "",
        price: "",
        category: "PRATO_PRINCIPAL",
      });
      fetchCardapio();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao cadastrar prato.");
    }
  };

  const handleSavePrice = async (id) => {
    try {
      await api.put(`/cardapio/admin/${id}`, { price: Number(editPrice) });
      setEditingId(null);
      fetchCardapio();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao atualizar preço.");
    }
  };

  const handleToggleAvailable = async (item) => {
    try {
      await api.put(`/cardapio/admin/${item.id}`, { available: !item.available });
      fetchCardapio();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao alterar disponibilidade.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff7ff]">
      <Header />
      <main className="m-7">
        <h1 className="font-['coolvetica'] text-4xl mb-6">Gerenciar Cardápio</h1>

        {/* Formulário de Criação */}
        <form
          onSubmit={handleCreate}
          className="bg-white p-4 rounded-lg shadow mb-8 flex flex-wrap gap-3 items-end"
        >
          <input
            type="text"
            placeholder="Nome do prato"
            required
            value={novoPrato.title}
            onChange={(e) => setNovoPrato({ ...novoPrato, title: e.target.value })}
            className="border p-2 rounded font-serif flex-1 min-w-50"
          />
          <input
            type="text"
            placeholder="Descrição breve"
            value={novoPrato.description}
            onChange={(e) =>
              setNovoPrato({ ...novoPrato, description: e.target.value })
            }
            className="border p-2 rounded font-serif flex-2 min-w-[250px]"
          />
          <select
            value={novoPrato.category}
            onChange={(e) =>
              setNovoPrato({ ...novoPrato, category: e.target.value })
            }
            className="border p-2 rounded font-serif"
          >
            <option value="ENTRADA">Entrada</option>
            <option value="PRATO_PRINCIPAL">Prato Principal</option>
            <option value="SOBREMESA">Sobremesa</option>
          </select>
          <input
            type="number"
            step="0.01"
            placeholder="Preço (R$)"
            required
            value={novoPrato.price}
            onChange={(e) => setNovoPrato({ ...novoPrato, price: e.target.value })}
            className="border p-2 rounded font-serif w-32"
          />
          <button
            type="submit"
            className="bg-[#A23E18] text-white px-4 py-2 rounded font-['coolvetica'] cursor-pointer hover:opacity-90"
          >
            + Adicionar
          </button>
        </form>

        {/* Tabela de Edição */}
        {loading ? (
          <p className="font-['coolvetica']">Carregando...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#303033] text-white font-['coolvetica']">
                <tr>
                  <th className="p-3">Prato</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Preço</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm divide-y">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="p-3 font-bold">{item.title}</td>
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">
                      {editingId === item.id ? (
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            step="0.01"
                            value={editPrice}
                            onChange={(e) => setEditPrice(e.target.value)}
                            className="border p-1 rounded w-24"
                          />
                          <button
                            onClick={() => handleSavePrice(item.id)}
                            className="bg-green-600 text-white px-2 py-1 rounded text-xs cursor-pointer"
                          >
                            OK
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="text-gray-500 px-1 text-xs cursor-pointer"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <span>R$ {Number(item.price).toFixed(2)}</span>
                      )}
                    </td>
                    <td className="p-3">
                      {item.available !== false ? (
                        <span className="text-green-600 font-bold">Ativo</span>
                      ) : (
                        <span className="text-amber-600 font-bold">Pausado</span>
                      )}
                    </td>
                    <td className="p-3 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(item.id);
                          setEditPrice(item.price);
                        }}
                        className="bg-[#303033] text-white px-3 py-1 rounded text-xs cursor-pointer"
                      >
                        Editar Preço
                      </button>
                      <button
                        onClick={() => handleToggleAvailable(item)}
                        className={`px-3 py-1 rounded text-xs text-white cursor-pointer ${
                          item.available !== false ? "bg-red-600" : "bg-green-600"
                        }`}
                      >
                        {item.available !== false ? "Pausar" : "Ativar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};