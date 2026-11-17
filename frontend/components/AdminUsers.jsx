import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { api } from "../src/services/api";

export const AdminUsers = () => {
  const [employees, setEmployees] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/users/employees");
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

  const handlePromote = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      await api.patch("/users/employees/promote", {
        email: email.trim().toLowerCase(),
      });
      setEmail("");
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao promover usuário.");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const nextStatus = !currentStatus; // Inverte o valor atual (true -> false / false -> true)

    try {
      // Envia { isActive: true/false } no body do PUT
      await api.put(`/users/employees/${id}/activate`, { isActive: nextStatus });
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.error || "Erro ao alterar status do funcionário.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#fff7ff]">
      <Header />
      <main className="m-7">
        <h1 className="font-['coolvetica'] text-4xl mb-6">Gestão de Equipe</h1>

        {/* Formulário para promover cliente cadastrado para EMPLOYEE */}
        <form onSubmit={handlePromote} className="flex gap-3 mb-6 max-w-lg">
          <input
            type="email"
            required
            placeholder="Digite o e-mail cadastrado do funcionário..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-white border border-gray-300 px-3 py-2 rounded font-serif"
          />
          <button
            type="submit"
            className="bg-[#303033] text-white px-4 py-2 rounded font-['coolvetica'] cursor-pointer hover:opacity-90"
          >
            Promover a Funcionário
          </button>
        </form>

        {loading ? (
          <p className="font-['coolvetica']">Carregando...</p>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#303033] text-white font-['coolvetica']">
                <tr>
                  <th className="p-3">Nome</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="font-serif text-sm divide-y">
                {employees.map((emp) => (
                  <tr key={emp.id}>
                    <td className="p-3 font-bold">{emp.name}</td>
                    <td className="p-3">
                      {emp.isActive ? (
                        <button
                          onClick={() => handleToggleStatus(emp.id, emp.isActive)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:opacity-90 cursor-pointer"
                        >
                          Desativar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(emp.id, emp.isActive)}
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