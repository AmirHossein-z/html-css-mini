"use client";
import { MutableRefObject, useEffect, useRef } from "react";
import { ClassContents, SelectTimes, Times } from "./_components";
import { ITimesType } from "./_types";
import { useLocalStorage } from "@/hooks";

export default function SelectCoursesUni() {
  const timesType = useRef<null | ITimesType[]>(null);
  const { getFromLS, placeToLS } = useLocalStorage();
  const selectTimesModalRef: MutableRefObject<HTMLDialogElement | null> =
    useRef(null);

  useEffect(() => {
    if (!(getFromLS("classTimes")?.length > 0)) {
      selectTimesModalRef.current?.showModal();
    }
  }, []);

  return (
    <>
      <div>
        <div className="container max-w-full px-4 mx-auto sm:px-8">
          <div className="py-8">
            <p className="text-lg text-center text-white">
              رنگ آبی برای روزهای زوج و رنگ قرمز برای روزهای فرد است
            </p>
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table
                  className="min-w-full leading-normal text-center"
                  style={{ direction: "rtl" }}
                >
                  <thead>
                    <tr className="text-right">
                      <Times />
                    </tr>
                  </thead>
                  <ClassContents />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SelectTimes timesType={timesType} ref={selectTimesModalRef} />
    </>
  );
}
