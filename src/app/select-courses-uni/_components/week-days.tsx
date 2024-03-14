import { IDays, TWeekDayNumber } from "../_types";

export default function WeekDays({ label }: { label: TWeekDayNumber }) {
  const days: IDays = {
    "1": "شنبه",
    "2": "یک‌شنبه",
    "3": "دوشنبه",
    "4": "سه‌شنبه",
    "5": "چهارشنبه",
    "6": "پنچ‌شنبه",
  };
  return (
    <td className="p-4 text-base bg-white border-b border-gray-200">
      <div className="flex items-center justify-center">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {days[label]}
        </p>
      </div>
    </td>
  );
}
