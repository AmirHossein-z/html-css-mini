import { TLocalStorageKey } from "@/types";
import { useEffect } from "react";

const getFromLS = (key: TLocalStorageKey) => {
  let itemsJSON;
  try {
    itemsJSON = localStorage.getItem(key);
    itemsJSON = itemsJSON ? JSON.parse(itemsJSON) : [];
  } catch (err) {
    console.log(`data in localStorage is currepted! ${err}`);
  }
  return itemsJSON ?? [];
};

const placeToLS = (key: TLocalStorageKey, ps: any[]) => {
  localStorage.setItem(key, JSON.stringify(ps));
};

const useLocalStorage = () => {
  return { getFromLS, placeToLS };
};

export default useLocalStorage;
