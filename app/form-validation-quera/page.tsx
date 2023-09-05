"use client";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import "./style.css";

/**
 * The demands of the problem

     When we click on the registration button, validation must be done.
     The full name can only consist of English alphabets and space,
     otherwise you must correctly enter the full name message in the p tag with the nameError class. to be displayed.
     Email validation should be in such a way that first there are a few characters without spaces,
     then we have the @ character, and then again there are a few characters without spaces after that dot,
     and at the end there are again a few characters without spaces. Otherwise,
     you must enter the email message correctly in the p tag with the emailError class. to be displayed.
     The password must contain at least 8 characters,
     including at least one number, one uppercase letter, and one lowercase letter, and otherwise,
     in the p tag with the passwordError class,
     the password message must contain at least 8 characters and include at least one number,
     one uppercase letter. And be a small letter. to be displayed. 

 */

interface IErrorMessage {
  status: boolean;
  message: string;
}

export default function FormValidation() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const usernameValidation = (value: string): IErrorMessage => {
    const regex = /^[a-zA-Z\ ]+$/;

    if (regex.test(value)) {
      return { status: true, message: "" };
    }
    return { status: false, message: "نام کامل را به درستی وارد کنید." };
  };

  const emailValidation = (value: string): IErrorMessage => {
    const regex = /^[a-zA-Z]{1,}\@[a-zA-Z]{1,}\.[a-zA-Z]{1,}$/;

    if (regex.test(value)) {
      return { status: true, message: "" };
    }
    return { status: false, message: "ایمیل را به درستی وارد کنید" };
  };

  const passwordValidation = (value: string): IErrorMessage => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (regex.test(value)) {
      return { status: true, message: "" };
    }
    return {
      status: false,
      message:
        "رمز عبور باید شامل حداقل 8 کاراکتر باشد و شامل حداقل یک عدد، یک حرف بزرگ و یک حرف کوچک باشد. ",
    };
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nameValidate = usernameValidation(inputs.username);
    const emailValidate = emailValidation(inputs.email);
    const passwordValidate = passwordValidation(inputs.password);

    setErrors({
      ...errors,
      username: nameValidate.message,
      email: emailValidate.message,
      password: passwordValidate.message,
    });
  };
  return (
    <main>
      <section className="container">
        <h2>ثبت‌نام در کوئرا تسک منیجر</h2>
        <form onSubmit={handleSubmit}>
          <label>نام کامل</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={(e) => handleChange(e)}
            ref={firstInputRef}
          />
          <p>{errors.username}</p>
          <label>ایمیل</label>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={(e) => handleChange(e)}
          />
          <p>{errors.email}</p>
          <label>رمز عبور</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={(e) => handleChange(e)}
          />
          <p>{errors.password}</p>
          <input type="submit" value="ثبت نام" />
        </form>
      </section>
    </main>
  );
}
