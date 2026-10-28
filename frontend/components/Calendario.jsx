import { DayPicker } from "react-day-picker";

const dayButtonStyles = "h-20 w-2 bg-[#fff7ff]";
const weekStyles = ''

export const Calendario = () => {
  return <DayPicker mode="single" classNames={{
    day_button: dayButtonStyles,
    week: weekStyles
  }}></DayPicker>;
};
