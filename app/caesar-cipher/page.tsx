"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { cipher } from "./_utils";
import { HiClipboard } from "react-icons/hi";

/**
 * encryption
 * Caesar cipher is one of the simplest encryption methods.
 * In this method, to encode a string, a fixed number nn is considered as a member of the interval [0,25][0,25],
 * and all the characters of the string are shifted forward by nn units.
 * For example, if we consider nn as 11, the character A becomes B or the character Z becomes A.
 * For English lowercase letters, they are converted in the same way;
 * For example, if we consider nn as 22, the character z becomes b and the character h becomes j.
 * In contrast to the encryption process, we have the decoding process,
 * which is the opposite of the encryption process, that is, each character is shifted backwards by nn units.
 * In these processes, each character can be considered as a member number of [0,25][0,25] interval;
 * That is, the characters a and A correspond to the number 0,
 * the characters b and B correspond to the number 1 and...
 * Note: If nn is greater than 25, the remainder of its division by 26 should be considered.
 * Also, the input string is guaranteed to contain only the characters a-z and A-Z (or it may be an empty string).
 * Encryption process:
 * En(x)=(x+n) mod 26 En(x)=(x+n) mod 26
 * Decoding process:
 * Dn(x)=(x−n) mod 26 Dn​(x)=(x−n) mod 26
 */

type IType = "decrypt" | "encrypt" | "";

interface IResult {
  type: IType;
  value: string;
}

interface IInput {
  statement: string;
  shift: string;
  type: IType;
}

export default function CaesarCipher() {
  const [clipboardText, setClipboardText] = useState("copy to clipboard");
  const [result, setResult] = useState<IResult>({ type: "", value: "" });
  const [inputs, setInputs] = useState<IInput>({
    statement: "",
    shift: "",
    type: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const selectedType =
      inputs.type === "encrypt"
        ? "encrypt"
        : inputs.type === "decrypt"
        ? "decrypt"
        : "";
    const r = cipher(inputs.statement, Number(inputs.shift), selectedType);
    setResult({ type: selectedType, value: r });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.value);
    setClipboardText("copied!");
  };

  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-3xl text-bright-turquoise font-bold text-center mt-10 mb-4 animate-pulse">
        caesar cipher
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-3/4 mx-auto h-full justify-center items-center gap-4 rounded"
      >
        <div className="grid gap-2 w-3/4">
          <label htmlFor="statement" className="text-gallery">
            statement:
          </label>
          <input
            type="text"
            id="statement"
            name="statement"
            className="rounded-xl flex-1 appearance-none border border-bright-turquoise w-full py-3 px-4 bg-transparent text-gallery shadow-sm text-base focus:outline-none focus:border-transparent placeholder:text-gallery placeholder:text-opacity-50 focus:ring focus:ring-radical-red focus:text-white"
            placeholder="Enter your statement here..."
            value={inputs.statement}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="grid gap-2 w-3/4">
          <label htmlFor="shift" className="text-gallery">
            shift:
            <span className="text-red-500 required-dot">*</span>
          </label>
          <input
            type="number"
            id="shift"
            name="shift"
            className="rounded-xl flex-1 appearance-none border border-bright-turquoise w-full py-3 px-4 bg-transparent text-gallery shadow-sm text-base focus:outline-none focus:border-transparent placeholder:text-gallery placeholder:text-opacity-50 focus:ring focus:ring-radical-red focus:text-white"
            placeholder="Enter your statement here..."
            value={inputs.shift}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <label className="text-gallery w-3/4" htmlFor="type">
          type:
          <select
            id="type"
            className="mt-2 rounded-xl flex-1 appearance-none border border-bright-turquoise w-full py-3 px-4 bg-transparent text-gallery shadow-sm text-base focus:outline-none focus:border-transparent placeholder:text-gallery placeholder:text-opacity-50 focus:ring focus:ring-radical-red focus:text-white"
            onChange={(e) => handleChange(e)}
            value={inputs.type}
            name="type"
          >
            <option value="">select type...</option>
            <option value="decrypt">decrypt</option>
            <option value="encrypt">encrypt</option>
          </select>
        </label>
        <button
          type="submit"
          className="my-2 shadow-blue text-center text-xl w-1/2 bg-bright-turquoise text-white py-2.5 px-2.5 rounded-xl focus:outline-none font-bold focus:shadow-none"
        >
          convert
        </button>
        {result.value.length > 0 && (
          <>
            <p className="flex flex-col items-center gap-2 text-gallery">
              Type selected:
              <span className="text-radical-red">{result.type}</span>
              Result:<span className="text-radical-red">{result.value}</span>
            </p>
            <button
              onClick={copyToClipboard}
              title="copy to clipboard"
              className="bg-radical-red text-white py-2.5 px-2.5 rounded flex items-center gap-2 mb-4"
            >
              <HiClipboard className="text-xl" />
              {clipboardText}
            </button>
          </>
        )}
      </form>
    </main>
  );
}
