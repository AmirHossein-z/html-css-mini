"use client";
import { useLocalStorage } from "@/hooks";
import { useEffect, useState } from "react";
import { ClassPlaceholder } from ".";
import { nanoid } from "nanoid";
import { IClassTimes, IDays, TWeekDayNumber } from "../_types";
import WeekDays from "./week-days";

const days: TWeekDayNumber[] = ["1", "2", "3", "4", "5", "6"];

const sortBaseStartTime = (ct: IClassTimes[]) => {
  return ct
    .sort((a, b) => {
      const startTimeA = parseInt(a.startTime, 10);
      const startTimeB = parseInt(b.startTime, 10);
      if (startTimeA < startTimeB) {
        return -1;
      } else if (startTimeA > startTimeB) {
        return 1;
      } else {
        return 0;
      }
    })
    .flat(1);
};

export default function ClassContents() {
  const { getFromLS, placeToLS } = useLocalStorage();
  const [classTimes, setClassTimes] = useState<IClassTimes[]>([]);

  useEffect(() => {
    const initialClassTimes = sortBaseStartTime(
      getFromLS("classTimes")?.length > 0
        ? getFromLS("classTimes")
        : [
            ...days
              .map((day) => {
                return [0, 2, 4, 5, 8, 10].map((item) => ({
                  id: nanoid(),
                  day: day,
                  startTime: `${8 + item}`,
                  content: "content",
                  type: "0",
                }));
              })
              .flat(1),
          ]
    );
    setClassTimes(initialClassTimes);
  }, []);

  const handleSetClassTime = (classTimes: IClassTimes[]) => {
    sortBaseStartTime(classTimes);
    setClassTimes(classTimes);
    placeToLS("classTimes", classTimes);
  };

  return (
    <tbody>
      {days.map((row) => (
        <tr key={row}>
          <WeekDays label={row} />
          {classTimes.map(
            (ct) =>
              ct.day === row && (
                <ClassPlaceholder
                  handleSetClassTime={handleSetClassTime}
                  classTime={ct}
                  key={ct.id}
                  classTimes={classTimes}
                />
              )
          )}
        </tr>
      ))}
    </tbody>
  );
}
