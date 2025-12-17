"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { GoPersonAdd } from "react-icons/go";
import { BsTrash3Fill } from "react-icons/bs";
import { MdOutlineDone } from "react-icons/md";
import { BsFilter } from "react-icons/bs";
import { BsSortAlphaDown } from "react-icons/bs";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { ActionKind, IPerson, IReducerState } from "./_types";
import { PersonData } from "./_components";
import { useLocalStorage } from "@/hooks";
import personReducer, { isAllChecked } from "./reducer";

type IFilterType = "default" | "alphabetic";
const LOCAL_STORAGE_KEY = "listPersons";
interface IInput {
  firstName: { values: string; styles: string };
  lastName: { values: string; styles: string };
}

const isValidName = (value: string) => {
  // this regex checks if user enters english character
  // and also whitespace is valid
  const regex = /^[\s\w]{1,25}$/;
  return regex.test(value);
};

export default function ListPerson() {
  const [names, setNames] = useState<IInput>({
    firstName: { styles: "", values: "" },
    lastName: { styles: "", values: "" },
  });
  const initialPersonState: IReducerState = {
    operation: "add",
    checkingIds: [],
    persons: [],
  };
  const [personState, dispatch] = useReducer(personReducer, initialPersonState);
  const [filteredPersons, setFilteredPersons] = useState<IPerson[]>([]);
  const [filterType, setFilterType] = useState<IFilterType>("default");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const search = useRef(params.get("search") ?? "");
  const memoizedPersons = useMemo(
    () => personState.persons,
    [personState.persons],
  );
  const { getFromLS, placeToLS } = useLocalStorage();

  useEffect(() => {
    const ps = getFromLS(LOCAL_STORAGE_KEY);

    dispatch({ type: ActionKind.ADD_PERSON, payload: { persons: ps } });
  }, []);

  useEffect(() => {
    placeToLS(LOCAL_STORAGE_KEY, memoizedPersons);
    filterList();
  }, [memoizedPersons]);

  const isSimilar = (obj: { firstName: string; lastName: string }) => {
    if (!personState.persons) {
      return false;
    }

    for (let p of personState.persons) {
      if (p.firstName === obj.firstName && p.lastName === obj.lastName)
        return true;
    }
    return false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "firstName") {
      if (isValidName(e.target.value)) {
        setNames((prevNames) => {
          return {
            ...prevNames,
            firstName: {
              values: e.target.value,
              styles: "focus:border-green-500",
            },
          };
        });
      } else {
        setNames((prevNames) => {
          return {
            ...prevNames,
            firstName: {
              values: e.target.value,
              styles: "focus:border-green-500",
            },
          };
        });
      }
    }

    if (e.target.name === "lastName") {
      if (isValidName(e.target.value)) {
        setNames((prevNames) => {
          return {
            ...prevNames,
            lastName: {
              values: e.target.value,
              styles: "focus:border-green-500",
            },
          };
        });
      } else {
        setNames((prevNames) => {
          return {
            ...prevNames,
            lastName: {
              values: e.target.value,
              styles: "focus:border-green-500",
            },
          };
        });
      }
    }
  };

  const checkAllPerson = () => {
    dispatch({ type: ActionKind.CHECK_ALL });
    setNames((prevNames) => {
      return {
        ...prevNames,
        lastName: {
          values: "",
          styles: "",
        },
        firstName: {
          values: "",
          styles: "",
        },
      };
    });
  };

  const deletePerson = (id: string) => {
    if (confirm("Are you sure want to delete?")) {
      dispatch({ type: ActionKind.DELETE_PERSON, payload: { id } });
      setNames((prevNames) => {
        return {
          ...prevNames,
          lastName: {
            values: "",
            styles: "",
          },
          firstName: {
            values: "",
            styles: "",
          },
        };
      });
    }
  };

  const editPerson = (person: IPerson) => {
    dispatch({ type: ActionKind.EDIT_STATE, payload: { id: person.id } });
    setNames((prevNames) => {
      return {
        ...prevNames,
        lastName: {
          values: person.lastName,
          styles: "",
        },
        firstName: {
          values: person.firstName,
          styles: "",
        },
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (personState.operation === "add") {
      if (
        isValidName(names.firstName.values) &&
        isValidName(names.lastName.values) &&
        !isSimilar({
          firstName: names.firstName.values,
          lastName: names.lastName.values,
        })
      ) {
        const newPerson: IPerson = {
          id: nanoid(),
          firstName: names.firstName.values,
          lastName: names.lastName.values,
        };
        dispatch({
          type: ActionKind.ADD_PERSON,
          payload: { persons: [...personState.persons, newPerson] },
        });

        setNames((prevNames) => {
          return {
            ...prevNames,
            lastName: {
              values: "",
              styles: "",
            },
            firstName: {
              values: "",
              styles: "",
            },
          };
        });
      }
    } else if (personState.operation === "edit") {
      if (
        isValidName(names.firstName.values) &&
        isValidName(names.lastName.values) &&
        !(names.firstName.values === "" || names.lastName.values == "")
      ) {
        const newPerson = {
          id: personState.checkingIds[0],
          firstName: names.firstName.values,
          lastName: names.lastName.values,
        };
        dispatch({
          type: ActionKind.EDIT_PERSON,
          payload: { person: newPerson },
        });
        setNames((prevNames) => {
          return {
            ...prevNames,
            lastName: {
              values: "",
              styles: "",
            },
            firstName: {
              values: "",
              styles: "",
            },
          };
        });
      }
    } else if (
      personState.operation === "delete" &&
      personState.checkingIds.length > 0 &&
      confirm("Are you sure want to delete?")
    ) {
      dispatch({ type: ActionKind.DELETE_PERSON });
    }
  };

  const handleChecking = (id: string) => {
    dispatch({ type: ActionKind.CHECK_ONE, payload: { id } });
    setNames((prevNames) => {
      return {
        ...prevNames,
        lastName: {
          values: "",
          styles: "",
        },
        firstName: {
          values: "",
          styles: "",
        },
      };
    });
  };

  const filterList = (params?: ChangeEvent<HTMLInputElement>) => {
    let finalFilter: IPerson[];
    if (typeof params === "undefined") {
      const filteredFromAlphabetic = filterBaseAlphabetic(
        getFromLS(LOCAL_STORAGE_KEY),
      );
      const filteredFromSearch = searchList(
        filteredFromAlphabetic,
        search.current,
      );
      finalFilter = filteredFromSearch;
    } else {
      const filteredFromSearch = searchList(
        getFromLS(LOCAL_STORAGE_KEY),
        params.target.value,
      );
      const filteredFromAlphabetic = filterBaseAlphabetic(filteredFromSearch);
      finalFilter = filteredFromAlphabetic;
    }
    setFilteredPersons(finalFilter);
  };

  const searchList = (ps: IPerson[], searchValue: string | undefined) => {
    // setSearch(searchValue ?? "");
    search.current = searchValue ?? "";
    params.set("search", searchValue ?? "");
    router.push(pathname + "?" + params.toString());

    const filtered = ps.filter(
      (p) =>
        p.firstName.toLowerCase().includes(searchValue ?? search.current) ||
        p.lastName.toLowerCase().includes(searchValue ?? search.current),
    );

    if (searchValue?.length === 0 || search.current.length === 0) {
      return ps;
    } else if (filtered.length === 0) {
      return [];
    } else {
      return filtered;
    }
  };

  const filterBaseAlphabetic = (ps: IPerson[]) => {
    let filtered: IPerson[] = [];
    if (filterType === "default") {
      filtered = ps;
    } else if (filterType === "alphabetic") {
      const copy = [...ps];
      copy.sort((a, b) => {
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
        if (a.firstName.toLowerCase() <= b.firstName.toLowerCase()) return -1;
        return 0;
      });
      filtered = copy;
    }
    params.set("filter", filterType);
    router.push(pathname + "?" + params.toString());
    return filtered;
  };

  const handleFilterType = () => {
    if (filterType === "alphabetic") {
      setFilterType("default");
    } else {
      setFilterType("alphabetic");
    }
  };

  return (
    <div className="container grid mx-auto">
      <h1 className="text-center text-base sm:text-xl md:text-3xl m-3 p-1 text-blue-200">
        List persons
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row items-center justify-center gap-5 my-5"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="flex justify-center text-white my-1 sm:my-0 sm:mx-2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={names.firstName.values}
              onChange={handleChange}
              placeholder="Enter first name here..."
              className={`${names.firstName.styles} focus:outline-none outline-none transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 border border-white border-opacity-20 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm`}
            />
          </div>
          <div className="flex justify-center text-white my-1 sm:my-0">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={names.lastName.values}
              onChange={handleChange}
              placeholder="Enter last name here..."
              className={`${names.lastName.styles} focus:outline-none outline-none transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 border border-white border-opacity-20 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm`}
            />
          </div>
        </div>
        <div className="w-full md:w-auto">
          <button
            type="submit"
            id="addButton"
            name="addButton"
            className={`cursor-pointer ${
              personState.operation === "add"
                ? "bg-green-500 hover:bg-green-900 focus:outline-green-500"
                : personState.operation === "edit"
                  ? "bg-yellow-500 hover:bg-yellow-900 focus:outline-yellow-900"
                  : personState.operation === "delete"
                    ? "bg-red-500 hover:bg-red-900 focus:outline-red-900"
                    : ""
            } py-1 px-2 w-1/4 md:w-auto flex justify-center gap-2 mx-auto sm:py-1.5 sm:px-3 md:px-3.5 rounded-sm text-lime-50 transition-all duration-300 focus:border-none outline-none`}
          >
            {personState.operation === "add" ? (
              <GoPersonAdd className="text-2xl" />
            ) : personState.operation === "edit" ? (
              <MdOutlineDone className="text-2xl" />
            ) : personState.operation === "delete" ? (
              <BsTrash3Fill className="text-2xl" />
            ) : null}
          </button>
        </div>
      </form>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-3">
        <div className="flex gap-2">
          <button
            className="bg-zinc-700 py-1 px-2 sm:py-1.5 md:py-2 sm:px-3 md:px-4 rounded-sm text-lime-50 hover:bg-zinc-900 transition-all duration-300"
            onClick={() => filterList()}
          >
            filter
          </button>
          <p
            className="cursor-pointer bg-zinc-700 py-1 px-2 sm:py-1.5 md:py-2 sm:px-3 md:px-4 rounded-sm text-lime-50 hover:bg-zinc-900 transition-all duration-300"
            onClick={() => handleFilterType()}
          >
            {filterType === "default" ? (
              <BsFilter className="text-2xl" />
            ) : filterType === "alphabetic" ? (
              <BsSortAlphaDown className="text-2xl" />
            ) : null}
          </p>
        </div>
        <div className="flex justify-center m-1 text-white">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            className="transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 md:p-2 mx-1 outline-none focus:outline-none focus:border-yellow-100 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm border border-white border-opacity-20"
            placeholder="Search name here..."
            value={search.current}
            onChange={(e) => filterList(e)}
          />
        </div>
      </div>
      <table
        id="showInfoTable"
        className="text-white table-auto grid w-full sm:w-3/4 max-h-80 p-1 sm:p-3 backdrop-blur-sm overflow-y-auto mx-auto"
      >
        <thead>
          <tr className="flex justify-between p-1 sm:p-1.5 border-b border-gray-50 border-opacity-10 text-xs sm:text-base">
            <th className="p-1 sm:p-1.5">
              <input
                type="checkbox"
                id="allPerson"
                name="allPerson"
                className=""
                checked={isAllChecked(personState)}
                onChange={checkAllPerson}
              />
            </th>
            <th className="p-1 sm:p-1.5">First name</th>
            <th className="p-1 sm:p-1.5">Last name</th>
            <th className="p-1 sm:p-1.5">Operations</th>
          </tr>
        </thead>
        <tbody className="">
          {filteredPersons.length > 0
            ? filteredPersons.map((person) => (
                <PersonData
                  key={person.id}
                  checkingIds={personState.checkingIds}
                  person={person}
                  handleChecking={handleChecking}
                  deletePerson={deletePerson}
                  editPerson={editPerson}
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}
