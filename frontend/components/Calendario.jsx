import { DayPicker } from "react-day-picker";

const dayButtonStyles =
  "flex justify-start items-start px-2 py-2 h-20 w-22 my-2 mx-2 bg-[#fff7ff]";
const weekStyles = "";
const rootStyles = "m-5";
const dayStyles = "";

export const Calendario = () => {
  return <DayPicker mode="single" components={{ DayButton: Day }}></DayPicker>;
};

const Day = (props) => {
  return (
    <div className="flex justify-start items-start px-2 py-2 h-20 w-22 my-2 mx-2 bg-[#fff7ff]">
      <p>Ola amigao</p>
    </div>
  );
};
