import {
  forwardRef,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

import { IClassTimes } from "./class-contents";

interface IAddModalProps {
  handleSubmit: (e: FormEvent) => void;
  inputs: IClassTimes;
  setInputs: Dispatch<SetStateAction<IClassTimes>>;
  canAddClassTime: () => boolean;
  type: IClassTimes["type"];
}
const AddModal = forwardRef<any, IAddModalProps>(function AddModal(
  { handleSubmit, inputs, setInputs, canAddClassTime, type },
  ref
) {
  const handelChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  return (
    <dialog id="my_modal_1" className="modal" ref={ref}>
      <form
        className="modal-box flex flex-col gap-4 bg-white"
        onSubmit={handleSubmit}
      >
        {!canAddClassTime() && (
          <p className="text-red-600">شما نمی‌توانید کلاس جدیدی اضافه کنید</p>
        )}
        <h3 className="font-bold text-lg">افزودن کلاس جدید</h3>
        <input
          type="text"
          className="input input-info"
          name="content"
          placeholder="نام کلاس"
          value={inputs.content}
          onChange={(e) => handelChange(e)}
        />
        <select
          className="select select-primary"
          placeholder="نوع کلاس"
          name="type"
          value={inputs.type}
          onChange={(e) => handelChange(e)}
        >
          {type === "1" ? (
            <>
              <option value="0">هیچکدام</option>
              <option value="2">فرد</option>
            </>
          ) : type === "2" ? (
            <>
              <option value="0">هیچکدام</option>
              <option value="1">زوج</option>
            </>
          ) : (
            canAddClassTime() && (
              <>
                <option value="0">هیچکدام</option>
                <option value="1">زوج</option>
                <option value="2">فرد</option>
                <option value="3">ثابت</option>
              </>
            )
          )}
        </select>

        <button type="submit" className="btn btn-secondary">
          افزودن
        </button>
      </form>
    </dialog>
  );
});

export default AddModal;
