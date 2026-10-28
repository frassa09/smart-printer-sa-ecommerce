import { Info } from "lucide-react";
import { Header } from "../../components/Header";
import { Calendario } from "../../components/Calendario";
import { ConfirmarReservaModal } from "../../components/ConfirmarReservaModal";

export const Reservas = () => {
  return (
    <div className="flex flex-col h-screen w-full bg-[#fff7ff]">
      <Header></Header>
      <main className="flex flex-col">
        <div className="m-7">
          <h1 className="font-['coolvetica'] text-4xl">Mesa & Reserva</h1>
          <p className="font-['coolvetica'] mt-3">
            Não perca tempo e faça já sua reserva para ter um momento incrível
            em nosso espaço!
          </p>
        </div>
        <div className="flex self-center items-center w-[95%] bg-white shadow p-5">
          <div className="flex flex-row items-center gap-3">
            <Info
              color="#A23E18"
              size={40}
              className="p-1 bg-[#FFEDE8]"
            ></Info>
            <div>
              <h2 className="font-coolvetica text-2xl">
                Agendamentos Exclusivos de Fim de Semana
              </h2>
              <p className="font-coolvetica">
                Atendimento intimista com vagas restritas por turno. Disponível
                estritamente para{" "}
                <a className="font-bold">Sexta, Sábado e Domingo</a>.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center shadow items-center bg-white max-w-[60%] overflow-hidden m-7">
            <Calendario></Calendario>
            <ConfirmarReservaModal></ConfirmarReservaModal>
        </div>
      </main>
    </div>
  );
};
