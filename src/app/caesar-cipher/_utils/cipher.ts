const NUMBER_ENUM: { [key: number]: string } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
  4: "E",
  5: "F",
  6: "G",
  7: "H",
  8: "I",
  9: "J",
  10: "K",
  11: "L",
  12: "M",
  13: "N",
  14: "O",
  15: "P",
  16: "Q",
  17: "R",
  18: "S",
  19: "T",
  20: "U",
  21: "V",
  22: "W",
  23: "X",
  24: "Y",
  25: "Z",
};

const LETTER_ENUM: { [key: string]: number } = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
  E: 4,
  F: 5,
  G: 6,
  H: 7,
  I: 8,
  J: 9,
  K: 10,
  L: 11,
  M: 12,
  N: 13,
  O: 14,
  P: 15,
  Q: 16,
  R: 17,
  S: 18,
  T: 19,
  U: 20,
  V: 21,
  W: 22,
  X: 23,
  Y: 24,
  Z: 25,
};

function isUpperCase(c: string) {
  return c === c.toUpperCase() && c !== c.toLowerCase();
}

function isLowerCase(c: string) {
  return c === c.toLowerCase() && c !== c.toUpperCase();
}

function getRemaining(num1: number) {
  const remain = num1 % 26;
  if (remain >= 0) {
    return remain;
  }
  return remain + 26;
}

function encrypt(str: string, n: number) {
  if (str.length === 0) {
    return str;
  }

  let output = [];
  for (let i = 0; i < str.length; i++) {
    if (isUpperCase(str[i])) {
      let num = LETTER_ENUM[str[i]] + n;
      output.push(NUMBER_ENUM[getRemaining(num)]);
    } else if (isLowerCase(str[i])) {
      let num = LETTER_ENUM[str[i].toUpperCase()] + n;
      output.push(NUMBER_ENUM[getRemaining(num)].toLowerCase());
    } else {
      output.push(str[i]);
    }
  }
  return output.join("");
}

function decrypt(str: string, n: number) {
  if (str.length === 0) {
    return str;
  }

  let output = [];
  for (let i = 0; i < str.length; i++) {
    if (isUpperCase(str[i])) {
      let num = LETTER_ENUM[str[i]] - n;
      output.push(NUMBER_ENUM[getRemaining(num)]);
    } else if (isLowerCase(str[i])) {
      let num = LETTER_ENUM[str[i].toUpperCase()] - n;
      output.push(NUMBER_ENUM[getRemaining(num)].toLowerCase());
    } else {
      output.push(str[i]);
    }
  }
  return output.join("");
}

const cipher = (
  str: string,
  shift: number,
  type: "encrypt" | "decrypt" | ""
) => {
  if (type === "encrypt") {
    return encrypt(str, shift);
  } else if (type === "decrypt") {
    return decrypt(str, shift);
  } else {
    return str;
  }
};

export default cipher;
