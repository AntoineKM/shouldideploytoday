import dayjs from "dayjs";
import { useTheme } from "@tonightpass/kitchen";

type DatepickerProps = {
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}

const Datepicker: React.FC<DatepickerProps> = ({
  setDate,
}: DatepickerProps) => {
  const {theme} = useTheme();

  return (
    <select style={{
      // il y'a une issue avec kitchen, j'ai donc utilisé un inline style (c'était le seul workaround)
      background: theme.colors.layout.darkest,
      padding: theme.gap.tiny,
      borderRadius: theme.radius.square,
    }} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
      setDate(dayjs(e.target.value));
    }}>
      {
        Array.from(Array(7).keys()).map((i) => {
          return (
            <option key={i} value={dayjs().subtract(i, "day").toISOString()}>
              {dayjs().subtract(i, "day").format("dddd")} ({dayjs().subtract(i, "day").format("MMM D")})
            </option>
          );
        })
      }
    </select>
  )
}

export default Datepicker