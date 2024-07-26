import dayjs from "dayjs";
import { Select, useTheme } from "kitchn";

type DatepickerProps = {
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

const Datepicker: React.FC<DatepickerProps> = ({
  setDate,
}: DatepickerProps) => {
  return (
    <Select
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        setDate(dayjs(e.target.value));
      }}
    >
      {Array.from(Array(7).keys()).map((i) => {
        return (
          <option key={i} value={dayjs().subtract(i, "day").toISOString()}>
            {dayjs().subtract(i, "day").format("dddd")} (
            {dayjs().add(i, "day").format("MMM D")})
          </option>
        );
      })}
    </Select>
  );
};

export default Datepicker;
