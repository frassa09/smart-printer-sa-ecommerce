import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { api } from "../src/services/api";

export const AdminUsers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      // 👇 Ajustado para a sua rota existente no backend
      const res = await api.get("/employees");
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Erro ao carregar funcionários:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleActivate = async (id) => {
    try {
      await api.put(`/users/${id}/activate`);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao ativar funcionário.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff7ff]">
      <Header />
      <main className="m-7">
        <h1 className="font-['coolvetica'] text-4xl mb-6">Gestão de Equipe</h1>

        {loading ? (
          <p className="font-['coolvetica']">Carregando...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#303033] text-white font-['coolvetica']">
                <tr>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm divide-y">
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="p-3 font-bold">{emp.name}</td>
                    <td className="p-3">
                      {emp.isActive ? (
                        <span className="text-green-600 font-bold">Ativo</span>
                      ) : (
                        <span className="text-amber-600 font-bold">Pendente</span>
                      )}
                    </td>
                    <td className="p-3">
                      {!emp.isActive && (
                        <button
                          onClick={() => handleActivate(emp.id)}
                          className="bg-green-600 text-white px-3 py-1 rounded hover:opacity-90 cursor-pointer"
                        >
                          Ativar Acesso
                        </button>
                      )}
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