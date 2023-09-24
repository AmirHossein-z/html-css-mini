"use client";
import { useLocalStorage } from "@/hooks";
import { useState } from "react";
import { ClassPlaceholder } from ".";
import { nanoid } from "nanoid";

/**
 * 0 -> nothing
 * 1 -> زوج
 * 2 -> فرد
 * 3 -> ثابت
 * 4 -> both زوج & فرد
 */
type IClassType = "0" | "1" | "2" | "3" | "4";

export interface IClassTimes {
  id: string;
  day: TWeekDayNumber;
  startTime: string;
  content: string;
  type: IClassType;
}

export default function ClassContents() {
  const { getFromLS, placeToLS } = useLocalStorage();
  const initialClassTimes = [
    getFromLS("classTimes")?.length > 0
      ? getFromLS("classTimes")
      : [
          ...Array.from([0, 2, 4, 6, 8, 10]).map((item) => ({
            id: nanoid(),
            day: "1",
            startTime: `${8 + item}`,
            content: "content",
            type: "0",
          })),
          ...Array.from([0, 2, 4, 6, 8, 10]).map((item) => ({
            id: nanoid(),
            day: "2",
            startTime: `${8 + item}`,
            content: "content",
            type: "0",
          })),
          ...Array.from([0, 2, 4, 6, 8, 10]).map((item) => ({
            id: nanoid(),
            day: "3",
            startTime: `${8 + item}`,
            content: "content",
            type: "0",
          })),
          ...Array.from([0, 2, 4, 6, 8, 10]).map((item) => ({
            id: nanoid(),
            day: "4",
            startTime: `${8 + item}`,
            content: "content",
            type: "0",
          })),
          ...Array.from([0, 2, 4, 6, 8, 10]).map((item) => ({
            id: nanoid(),
            day: "5",
            startTime: `${8 + item}`,
            content: "content",
            type: "0",
          })),
          ...Array.from([0, 2, 4, 6, 8, 10]).map((item) => ({
            id: nanoid(),
            day: "6",
            startTime: `${8 + item}`,
            content: "content",
            type: "0",
          })),
        ],
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
  const days: TWeekDayNumber[] = ["1", "2", "3", "4", "5", "6"];

  // console.log("classTimes after sort :>> ", classTimes);
  const handleSetClassTime = (classTimes: IClassTimes[]) => {
    // console.log("classTimes before sort :>> ", classTimes);
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
      {Array.from(days).map((row) => (
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

type TWeekDayNumber = "1" | "2" | "3" | "4" | "5" | "6";

interface IDays {
  [key: string]: string;
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
