"use client";

import { useRef, MutableRefObject, useState, FormEvent } from "react";
import { AddModal } from ".";
import ClassContent from "./class-content";
import { IClassTimes } from "../_types";

interface IProps {
  classTime: IClassTimes;
  handleSetClassTime: (classTimes: IClassTimes[]) => void;
  classTimes: IClassTimes[];
}

// better UI

function ClassPlaceholder({
  classTime,
  handleSetClassTime,
  classTimes,
}: IProps) {
  const addModal: MutableRefObject<HTMLDialogElement | null> = useRef(null);
  const [inputs, setInputs] = useState<IClassTimes>({
    id: classTime.id,
    content: classTime.content,
    day: classTime.day,
    startTime: classTime.startTime,
    type: "0",
  });

  const canHaveTwoClass = () => {
    // اگر فرد باشه فقط می‌تونه زوج اضافه کنه
    // اگر زوج باشه فقط می‌تونه فرد اضافه کنه
    return (
      (classTime.type === "1" && inputs.type === "2") ||
      (classTime.type === "2" && inputs.type === "1")
    );
  };

  const canAddClassTime = () => {
    if (classTime.type === "3" || classTime.type === "4") {
      return false;
    } else if (canHaveTwoClass()) {
      return true;
    }
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (canAddClassTime() && inputs.type !== "0") {
      const prevContent = classTime.content;
      let newContent = inputs.content;
      let newType: IClassTimes["type"] = inputs.type;
      if (classTime.type === "0") {
        newContent = inputs.content;
        newType = inputs.type;
      } else if (classTime.type === "1" && inputs.type === "2") {
        newContent = `${prevContent};${newContent}`;
        newType = "4";
      } else if (classTime.type === "2" && inputs.type === "1") {
        newContent = `${newContent};${prevContent}`;
        newType = "4";
      }

      const copy = [...classTimes];
      copy.splice(
        copy.findIndex((ct) => ct.id === inputs.id),
        1
      );

      handleSetClassTime([
        ...copy,
        {
          content: newContent,
          id: inputs.id,
          day: inputs.day,
          startTime: inputs.startTime,
          type: newType,
        },
      ]);
      addModal.current?.close();
    } else {
      alert("شما نمی‌توانید کلاس جدیدی اضافه کنید");
    }
  };

  const handleDelete = () => {
    const copy = [...classTimes];
    copy.splice(
      copy.findIndex((ct) => ct.id === inputs.id),
      1
    );

    handleSetClassTime([
      ...copy,
      {
        content: "",
        id: inputs.id,
        day: inputs.day,
        startTime: inputs.startTime,
        type: "0",
      },
    ]);
  };

  return (
    <>
      <td className="relative top-0 p-4 text-sm bg-white border border-gray-200 group hover:bg-pink-100 transition-all duration-300 ease-linear">
        <ClassContent content={classTime.content} type={classTime.type} />
        <div className="absolute z-10 w-full h-full top-0 left-0  flex gap-2 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in">
          <button
            type="button"
            className="p-3 text-xs  bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 focus:ring-offset-pink-200 text-white w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
            onClick={handleDelete}
          >
            حذف
          </button>
          <button
            type="button"
            className="p-3 text-xs  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded"
            id="my_modal_7"
            onClick={() => addModal.current?.showModal()}
          >
            افزودن
          </button>
        </div>

        <AddModal
          handleSubmit={handleSubmit}
          ref={addModal}
          inputs={inputs}
          setInputs={setInputs}
          canAddClassTime={canAddClassTime}
          type={classTime.type}
        />
      </td>
    </>
  );
}

export default ClassPlaceholder;
