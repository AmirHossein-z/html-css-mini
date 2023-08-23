"use client";
import { MouseEvent, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { BsGoogle } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

interface IModalType {
  show: boolean;
  type: "GOOGLE" | "FACEBOOK" | "TWITTER" | "";
}

interface IModalContainer {
  modal: IModalType;
  children: React.ReactNode;
  changeModalState: (
    modalType: IModalType["type"],
    state?: boolean | undefined
  ) => void;
  targetModal: IModalType["type"];
}

const ModalContainer = ({
  modal,
  children,
  changeModalState,
  targetModal,
}: IModalContainer) => {
  return (
    <div
      className={`bg-gray-900 fixed inset-0 bg-opacity-40 z-10 flex items-center justify-center ${
        modal.show && modal.type === targetModal ? "" : "hidden"
      }`}
      onClick={(e: MouseEvent<HTMLDivElement>) => {
        const target = e.target as Element;
        if (target.classList.contains("bg-gray-900")) {
          changeModalState(targetModal, false);
        }
      }}
    >
      {children}
    </div>
  );
};

interface IInputProps {
  type:
    | "button"
    | "checkbox "
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const Input = ({ type, id, name, value = "", onChange }: IInputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-full border border-gray-300 shadow-glass bg-transparent p-1 focus:outline-none pl-8"
    />
  );
};

const TwitterIcon = ({
  changeModalState,
}: {
  changeModalState: (modalType: IModalType["type"], state?: boolean) => void;
}) => {
  return (
    <div
      className="text-white bg-blue-400 rounded-full cursor-pointer hover:scale-110 p-3 transition-all duration-300 ease-in-out"
      onClick={() => changeModalState("TWITTER", true)}
    >
      <BsTwitter className="text-xl" />
    </div>
  );
};

interface ITabTitleProps {
  activeTab: number;
  tabIndex: number;
  children: React.ReactNode;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}
const TabTitle = ({
  setActiveTab,
  activeTab,
  tabIndex,
  children,
}: ITabTitleProps) => {
  return (
    <li
      className={`${
        activeTab === tabIndex ? "border-blue-600" : "border-transparent"
      } px-4 py-2 transition-all duration-300 ease-linear border-b-2 border-blue-600 cursor-pointer`}
      onClick={() => {
        setActiveTab(tabIndex);
      }}
    >
      {children}
    </li>
  );
};

const GoogleIcon = ({
  changeModalState,
}: {
  changeModalState: (modalType: IModalType["type"], state?: boolean) => void;
}) => {
  return (
    <div
      className="text-white bg-red-500 rounded-full cursor-pointer hover:scale-110 p-3 transition-all duration-300 ease-in-out"
      onClick={() => changeModalState("GOOGLE", true)}
    >
      <BsGoogle className="text-xl" />
    </div>
  );
};

const FacebookIcon = ({
  changeModalState,
}: {
  changeModalState: (modalType: IModalType["type"], state?: boolean) => void;
}) => {
  return (
    <div
      className="text-white bg-blue-700 rounded-full cursor-pointer hover:scale-110 p-3 transition-all duration-300 ease-in-out"
      onClick={() => changeModalState("FACEBOOK", true)}
    >
      <BsFacebook className="text-xl" />
    </div>
  );
};

export default function RegisterLogin() {
  const [activeTab, setActiveTab] = useState(0);
  const [loginInputs, setLoginInputs] = useState({
    loginUsername: "",
    loginPassword: "",
  });
  const [modal, setModal] = useState<IModalType>({ show: false, type: "" });
  const [registerInputs, setRegisterInputs] = useState({
    registerName: "",
    registerPassword: "",
    registerEmail: "",
  });

  const changeModalState = (modalType: IModalType["type"], state = true) => {
    setModal({ show: state, type: modalType });
  };

  const onChangeFormLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  };

  const onChangeFormRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInputs({ ...registerInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gradient-to-r from-red-500 to-indigo-600 h-screen overflow-hidden flex justify-center items-center">
      <main className="border border-gray-300 bg-white bg-opacity-50 p-4 rounded-2xl max-w-2xl w-full">
        <ul className="flex flex-row justify-center items-center text-lg mb-8 text-blue-600">
          <TabTitle
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            tabIndex={0}
          >
            Login
          </TabTitle>
          <TabTitle
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            tabIndex={1}
          >
            Register
          </TabTitle>
        </ul>
        <div>
          <div
            className={`transition-all duration-200 ease-out fade ${
              activeTab === 0 ? "" : "opacity-0 max-h-0"
            }`}
          >
            <div className="flex flex-col items-center gap-4 mb-8">
              <h3 className="text-xl font-medium">Login with:</h3>
              <div className="flex gap-4 items-center">
                {/* login icons */}
                <TwitterIcon changeModalState={changeModalState} />
                <FacebookIcon changeModalState={changeModalState} />
                <GoogleIcon changeModalState={changeModalState} />
                {/* twitter modal */}
                <ModalContainer
                  modal={modal}
                  changeModalState={changeModalState}
                  targetModal="TWITTER"
                >
                  <div className="w-full max-w-md sm:max-w-md rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-1">
                    <div className="bg-blue-400 text-white h-full col-span-1 flex justify-center items-center sm:p-5">
                      <BsTwitter className="text-3xl" />
                    </div>
                  </div>
                </ModalContainer>
                {/* facebook modal */}
                <ModalContainer
                  modal={modal}
                  changeModalState={changeModalState}
                  targetModal="FACEBOOK"
                >
                  <div className="w-full max-w-md sm:max-w-md rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-1">
                    <div className="bg-blue-700 text-white h-full col-span-1 flex justify-center items-center sm:p-5">
                      <FaFacebookF className="text-3xl" />
                    </div>
                  </div>
                </ModalContainer>
                {/* google modal */}
                <ModalContainer
                  modal={modal}
                  changeModalState={changeModalState}
                  targetModal="GOOGLE"
                >
                  <div className="w-full max-w-md sm:max-w-md rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-1">
                    <div className="bg-red-500 text-white h-full col-span-1 flex justify-center items-center sm:p-5">
                      <FaGoogle className="text-3xl" />
                    </div>
                  </div>
                </ModalContainer>
              </div>
            </div>
            {/* login form */}
            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="loginUsername"
                  className="text-base font-medium text-gray-800"
                >
                  username
                </label>
                <div className="relative">
                  <FaUserAlt className="absolute top-2 left-2.5 text-indigo-600 " />
                  <Input
                    type="text"
                    id="loginUsername"
                    name="loginUsername"
                    value={loginInputs.loginUsername}
                    onChange={onChangeFormLogin}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="loginPassword"
                  className="text-base font-medium text-gray-800"
                >
                  password
                </label>
                <div className="relative">
                  <FaLock className="absolute top-2 left-2.5 text-indigo-600" />
                  <Input
                    type="password"
                    id="loginPassword"
                    name="loginPassword"
                    value={loginInputs.loginPassword}
                    onChange={onChangeFormLogin}
                  />
                </div>
              </div>
              <div className="">
                <button className="mx-auto flex items-center justify-center rounded-3xl bg-indigo-700 hover:bg-indigo-900 transition-all ease-linear duration-300 text-white px-3.5 p-1.5 text-base font-medium shadow-lg w-1/2">
                  Log In
                </button>
              </div>
            </form>
          </div>
          {/* register form */}
          <div
            className={`transition-all duration-200 ease-out ${
              activeTab === 1 ? "" : "opacity-0 max-h-0"
            }`}
          >
            <div className="flex flex-col items-center gap-4 mb-8">
              <h3 className="text-xl font-medium">Register with:</h3>
              <div className="flex gap-4 items-center">
                {/* login icons */}
                <TwitterIcon changeModalState={changeModalState} />
                <FacebookIcon changeModalState={changeModalState} />
                <GoogleIcon changeModalState={changeModalState} />
                {/* twitter modal */}
                <ModalContainer
                  modal={modal}
                  targetModal="TWITTER"
                  changeModalState={changeModalState}
                >
                  <div className="w-full max-w-md sm:max-w-md rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-1">
                    <div className="bg-blue-400 text-white h-full col-span-1 flex justify-center items-center sm:p-5">
                      <BsTwitter className="text-3xl" />
                    </div>
                  </div>
                </ModalContainer>
                {/* facebook modal */}
                <ModalContainer
                  modal={modal}
                  targetModal="FACEBOOK"
                  changeModalState={changeModalState}
                >
                  <div className="w-full max-w-md sm:max-w-md rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-1">
                    <div className="bg-blue-700 text-white h-full col-span-1 flex justify-center items-center sm:p-5">
                      <FaFacebookF className="text-3xl" />
                    </div>
                  </div>
                </ModalContainer>
                {/* google modal */}
                <ModalContainer
                  modal={modal}
                  targetModal="GOOGLE"
                  changeModalState={changeModalState}
                >
                  <div className="w-full max-w-md sm:max-w-md rounded-2xl overflow-hidden grid grid-cols-3 sm:grid-cols-1">
                    <div className="bg-red-500 text-white h-full col-span-1 flex justify-center items-center sm:p-5">
                      <FaGoogle className="text-3xl" />
                    </div>
                  </div>
                </ModalContainer>
              </div>
            </div>

            <form className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="registerName"
                  className="text-base font-medium text-gray-800"
                >
                  name
                </label>
                <div className="relative">
                  <FaUserAlt className="absolute top-2 left-2.5 text-indigo-600 " />
                  <Input
                    type="text"
                    id="registerName"
                    name="registerName"
                    value={registerInputs.registerName}
                    onChange={onChangeFormRegister}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="registerEmail"
                  className="text-base font-medium text-gray-800"
                >
                  email
                </label>
                <div className="relative">
                  <MdEmail className="absolute top-2 left-2.5 text-indigo-600 text-lg" />
                  <Input
                    type="text"
                    id="registerEmail"
                    name="registerEmail"
                    value={registerInputs.registerEmail}
                    onChange={onChangeFormRegister}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="registerPassword"
                  className="text-base font-medium text-gray-800"
                >
                  password
                </label>
                <div className="relative">
                  <FaLock className="absolute top-2 left-2.5 text-indigo-600" />
                  <Input
                    type="password"
                    id="registerPassword"
                    name="registerPassword"
                    value={registerInputs.registerPassword}
                    onChange={onChangeFormRegister}
                  />
                </div>
              </div>
              <div className="">
                <button className="mx-auto flex items-center justify-center rounded-3xl bg-indigo-700 hover:bg-indigo-900 transition-all ease-linear duration-300 text-white px-3.5 p-1.5 text-base font-medium shadow-lg w-1/2">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
