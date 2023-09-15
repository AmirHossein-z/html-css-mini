import { TLocalStorageKey } from "@/types";

const getFromLS = (key: TLocalStorageKey) => {
  let personsJSON;
  try {
    personsJSON = localStorage.getItem(key);
    personsJSON = personsJSON ? JSON.parse(personsJSON) : [];
  } catch (err) {
    console.log(`data in localStorage is currepted! ${err}`);
  }
  return personsJSON ?? [];
};

const placeToLS = (key: TLocalStorageKey, ps: any[]) => {
  localStorage.setItem(key, JSON.stringify(ps));
};

const useLocalStorage = () => {
  return { getFromLS, placeToLS };
};

export default useLocalStorage;
