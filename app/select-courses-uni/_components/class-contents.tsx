"use client";
import { useLocalStorage } from "@/hooks";
import { useState } from "react";
import { ClassPlaceholder } from ".";
import { nanoid } from "nanoid";
import { IClassTimes, IDays, TWeekDayNumber } from "../_types";

export default function ClassContents() {
  const { getFromLS, placeToLS } = useLocalStorage();
  const days: TWeekDayNumber[] = ["1", "2", "3", "4", "5", "6"];
  const initialClassTimes =
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
          .sort((a, b) => {
            const startTimeA = parseInt(a.startTime);
            const startTimeB = parseInt(b.startTime);
            if (startTimeA < startTimeB) {
              return -1;
            } else if (startTimeA > startTimeB) {
              return 1;
            } else {
              return 0;
            }
          })
          .flat(1);

  const [classTimes, setClassTimes] =
    useState<IClassTimes[]>(initialClassTimes);

  const handleSetClassTime = (classTimes: IClassTimes[]) => {
    classTimes
      .sort((a, b) => {
        const startTimeA = parseInt(a.startTime);
        const startTimeB = parseInt(b.startTime);
        if (startTimeA < startTimeB) {
          return -1;
        } else if (startTimeA > startTimeB) {
          return 1;
        } else {
          return 0;
        }
      })
      .flat(1);
    setClassTimes(classTimes);
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

function WeekDays({ label }: { label: TWeekDayNumber }) {
  const days: IDays = {
    "1": "شنبه",
    "2": "یک‌شنبه",
    "3": "دوشنبه",
    "4": "سه‌شنبه",
    "5": "چهارشنبه",
    "6": "پنچ‌شنبه",
  };
  return (
    <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
      <div className="flex items-center">
        <p className="text-gray-900 whitespace-no-wrap font-semibold">
          {days[label]}
        </p>
      </div>
    </td>
  );
}
