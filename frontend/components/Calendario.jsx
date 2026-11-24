export const Calendario = () => {
  const [primeiraSexta, segundaSexta] = getProximasDuasSextas();

  return <div className="flex bg-white min-w-[65%] h-120 shadow-xl">oi</div>;
};

const getProximasDuasSextas = () => {
  const hoje = new Date();
  const diaSemana = hoje.getDay();

  const diasParaSexta = (5 - diaSemana + 7) % 7;

  const primeiraSexta = new Date(hoje);
  primeiraSexta.setDate(hoje.getDate() + diasParaSexta);

  const segundaSexta = new Date(primeiraSexta);
  segundaSexta.setDate(primeiraSexta.getDate() + 7);

  return [primeiraSexta, segundaSexta];
};