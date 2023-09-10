"use client";

import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { BsTrash3Fill } from "react-icons/bs";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";

type IOperation = "add" | "edit" | "delete";
interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
}

export default function ListPerson() {
  const [firstName, setFirstName] = useState({ value: "", styles: "" });
  const [lastName, setLastName] = useState({ value: "", styles: "" });
  const [operation, setOperation] = useState<IOperation>("add");
  const [checkingIds, setCheckingIds] = useState<string[]>([]);
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<IPerson[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState(params.get("search") ?? "");

  const getPersonsListFromLS = (): Array<IPerson> => {
    const personsJSON = localStorage.getItem("listPersons");
    return personsJSON ? JSON.parse(personsJSON) : [];
  };

  useEffect(() => {
    setPersons(getPersonsListFromLS());
  }, []);

  const deleteOneFromLS = (id: string) => {
    const ps = getPersonsListFromLS();
    ps.splice(
      ps.findIndex((p) => p.id === id),
      1
    );
    localStorage.setItem("listPersons", JSON.stringify(ps));
  };

  const deleteManyFromLS = (ids: string[]) => {
    const ps = getPersonsListFromLS();
    const newPersons = ps.filter((p) => !ids.includes(p.id));
    localStorage.setItem("listPersons", JSON.stringify(newPersons));
  };

  const isSimilar = (obj: { firstName: string; lastName: string }) => {
    const ps = getPersonsListFromLS();
    if (!ps) {
      return false;
    }

    for (let p of ps) {
      if (p.firstName === obj.firstName && p.lastName === obj.lastName)
        return true;
    }
    return false;
  };

  const isValidName = (value: string) => {
    // this regex checks if user enters english character
    // and also whitespace is valid
    const regex = /^[\s\w]{1,25}$/;
    return regex.test(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "firstName") {
      if (isValidName(e.target.value)) {
        setFirstName({
          value: e.target.value,
          styles: "focus:border-green-500",
        });
      } else {
        setFirstName({
          ...firstName,
          value: e.target.value,
          styles: "focus:border-red-600",
        });
      }
    }

    if (e.target.name === "lastName") {
      if (isValidName(e.target.value)) {
        setLastName({
          value: e.target.value,
          styles: "focus:border-green-500",
        });
      } else {
        setLastName({
          value: e.target.value,
          styles: "focus:border-red-600",
        });
      }
    }
  };

  const isAllChecked = () => {
    const personIds = persons.map((p) => p.id);
    return (
      checkingIds.length > 0 &&
      personIds.every((personId) => checkingIds.includes(personId))
    );
  };

  const checkAllPerson = () => {
    if (isAllChecked()) {
      setCheckingIds([]);
      setOperation("add");
    } else {
      const personIds = persons.map((p) => p.id);
      setCheckingIds(personIds);
      setOperation("delete");
    }
    setFirstName({ value: "", styles: "" });
    setLastName({ value: "", styles: "" });
  };

  const deletePerson = (id: string) => {
    const copyPerson = [...persons];
    copyPerson.splice(
      copyPerson.findIndex((p) => p.id === id),
      1
    );
    setPersons(copyPerson);
    deleteOneFromLS(id);
    setCheckingIds([]);
    setFirstName({ value: "", styles: "" });
    setLastName({ value: "", styles: "" });
  };

  const editPerson = (person: IPerson) => {
    setCheckingIds([person.id]);
    setOperation("edit");
    setFirstName({ value: person.firstName, styles: "" });
    setLastName({ value: person.lastName, styles: "" });
  };

  const addToLocalStorage = (person: IPerson) => {
    const ps = getPersonsListFromLS();

    ps.push(person);
    localStorage.setItem("listPersons", JSON.stringify(ps));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (operation === "add") {
      if (isValidName(firstName.value) && isValidName(lastName.value)) {
        if (
          !isSimilar({ firstName: firstName.value, lastName: lastName.value })
        ) {
          const newPerson: IPerson = {
            id: nanoid(),
            firstName: firstName.value,
            lastName: lastName.value,
          };
          setPersons([...persons, newPerson]);
          setFirstName({ styles: "", value: "" });
          setLastName({ styles: "", value: "" });
          addToLocalStorage(newPerson);
        }
      }
    } else if (operation === "edit") {
      const copy = [...persons];
      copy.splice(
        copy.findIndex((person) => person.id === checkingIds[0]),
        1
      );
      const newPerson = {
        id: checkingIds[0],
        firstName: firstName.value,
        lastName: lastName.value,
      };
      deleteOneFromLS(checkingIds[0]);
      addToLocalStorage(newPerson);
      setPersons([...copy, newPerson]);
      setCheckingIds([]);
      setOperation("add");
      setFirstName({ styles: "", value: "" });
      setLastName({ styles: "", value: "" });
    } else if (operation === "delete" && checkingIds.length > 0) {
      const copy = [...persons];
      const newPersons = copy.filter((p) => !checkingIds.includes(p.id));

      deleteManyFromLS([...checkingIds]);
      setPersons(newPersons);
      setOperation("add");
    }
  };

  const handleChecking = (id: string) => {
    if (!checkingIds.includes(id)) {
      setCheckingIds([...checkingIds, id]);
      setOperation("delete");
    } else {
      if (checkingIds.length === 1) {
        setOperation("add");
      }
      const copy = [...checkingIds];
      copy.splice(copy.indexOf(id), 1);
      setCheckingIds(copy);
    }
    setFirstName({ styles: "", value: "" });
    setLastName({ styles: "", value: "" });
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitSearch = (e: MouseEvent<HTMLButtonElement>) => {
    const filtered = persons.filter(
      (p) => search.includes(p.firstName) || search.includes(p.lastName)
    );
    if (search.length === 0) {
      setFilteredPersons(persons);
    } else if (filtered.length === 0) {
      setFilteredPersons([]);
    } else {
      setFilteredPersons(filtered);
    }
    params.set("search", search);
    router.push(pathname + "?" + params.toString());
  };

  return (
    <div className="container grid">
      <h1 className="text-center text-base sm:text-xl md:text-3xl m-3 p-1 text-blue-200">
        List persons
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center gap-5 my-5"
      >
        <div className="flex flex-col sm:flex-row">
          <div className="flex justify-center text-white my-1 sm:my-0 sm:mx-2">
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName.value}
              onChange={handleChange}
              placeholder="Enter first name here..."
              className={`${firstName.styles} focus:outline-none outline-none transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 border border-white border-opacity-20 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm`}
            />
          </div>
          <div className="flex justify-center text-white my-1 sm:my-0">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName.value}
              onChange={handleChange}
              placeholder="Enter last name here..."
              className={`${lastName.styles} focus:outline-none outline-none transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 border border-white border-opacity-20 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm`}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            id="addButton"
            name="addButton"
            className={`cursor-pointer ${
              operation === "add"
                ? "bg-green-500 hover:bg-green-900 focus:outline-green-500"
                : operation === "edit"
                ? "bg-yellow-500 hover:bg-yellow-900 focus:outline-yellow-900"
                : operation === "delete"
                ? "bg-red-500 hover:bg-red-900 focus:outline-red-900"
                : ""
            } bg-green-500 py-1 px-2 sm:py-1.5 sm:px-3 md:px-3.5 rounded-sm text-lime-50 transition-all duration-300 focus:border-none outline-none`}
          >
            {operation === "add" ? (
              <GoPersonAdd className="text-2xl" />
            ) : operation === "edit" ? (
              <MdOutlineDone className="text-2xl" />
            ) : operation === "delete" ? (
              <BsTrash3Fill className="text-2xl" />
            ) : null}
          </button>
        </div>
      </form>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 my-3">
        <div className="flex gap-2">
          <button
            className="bg-zinc-700 py-1 px-2 sm:py-1.5 md:py-2 sm:px-3 md:px-4 rounded-sm text-lime-50 hover:bg-zinc-900 transition-all duration-300"
            id="filterButton"
          >
            {/* <FiSearch /> */}
            filter
          </button>
        </div>
        <div className="flex justify-center m-1 text-white">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            className="transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 md:p-2 mx-1 outline-none focus:outline-none focus:border-yellow-100 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm border border-white border-opacity-20"
            placeholder="Search name here..."
            value={search}
            onChange={(e) => handleSearch(e)}
          />
          <button
            type="button"
            onClick={(e) => submitSearch(e)}
            className="bg-zinc-700 py-1 px-2 sm:py-1.5 md:py-2 sm:px-3 md:px-4 rounded-sm text-lime-50 hover:bg-zinc-900 transition-all duration-300"
          >
            search
          </button>
        </div>
      </div>
      <table
        id="showInfoTable"
        className="text-white table-auto grid w-full sm:w-3/4 max-h-80 p-1 sm:p-3 backdrop-blur-sm overflow-y-auto"
      >
        <thead>
          <tr className="flex justify-between p-1 sm:p-1.5 border-b border-gray-50 border-opacity-10 text-xs sm:text-base">
            <th className="p-1 sm:p-1.5">
              <input
                type="checkbox"
                id="allPerson"
                name="allPerson"
                className=""
                checked={isAllChecked()}
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
                  checkingIds={checkingIds}
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

interface IPersonDataProps {
  person: IPerson;
  checkingIds: string[];
  handleChecking: (id: string) => void;
  deletePerson: (id: string) => void;
  editPerson: (person: IPerson) => void;
}

const PersonData = ({
  person,
  checkingIds,
  handleChecking,
  deletePerson,
  editPerson,
}: IPersonDataProps) => {
  return (
    <tr
      className={`${
        checkingIds.includes(person.id) ? "bg-gray-700" : ""
      } animate-fade_in_from_bottom flex justify-between cursor-pointer text-center text-xs sm:text-base p-1 sm:p-1.5 border-b border-gray-50 border-opacity-10 transition-all duration-300 hover:bg-gray-600`}
    >
      <td className="p-1 sm:p-1.5">
        <input
          type="checkbox"
          checked={checkingIds.includes(person.id)}
          onChange={() => handleChecking(person.id)}
        />
      </td>
      <td className="p-1 sm:p-1.5">{person.firstName}</td>
      <td className="p-1 sm:p-1.5">{person.lastName}</td>
      <td className="p-1 sm:p-1.5 flex items-center gap-5 justify-center min-w-[15%]">
        <button
          type="button"
          className="text-red-700 hover:text-red-900 text-xs sm:text-sm"
          onClick={() => deletePerson(person.id)}
        >
          <BsTrash3Fill size="20px" />
        </button>
        {"    "}
        <button
          type="button"
          className="text-yellow-400 hover:text-yellow-700 text-xs sm:text-sm"
          onClick={() => editPerson(person)}
        >
          <MdEdit size="20px" />
        </button>
      </td>
    </tr>
  );
};
// // triggers with every change in search input
// searchInput.addEventListener("input", searchPersons);
// filterButton.addEventListener("click", filterPersons);
// // when DOM and styles loaded,then persons saved in local Storage should be fetched

// function filterPersons(event) {
//     let table = document.querySelector("#showInfoTable > tbody");
//     let persons = JSON.parse(localStorage.getItem("listPersons"));

//     // if filter button is alphabetic shape,then it should be displayed base on alphabetic order
//     if (filterButton.children[0].classList.contains("fa-list")) {
//         filterButton.innerHTML = `<i class="fa-solid fa-arrow-down-a-z"></i>`;
//         // sort person lists base on first name
//         let sortedTable = Array.from(table.children).sort((a, b) => {
//             if (
//                 a.children[1].innerHTML.toLowerCase() >
//                 b.children[1].innerHTML.toLowerCase()
//             )
//                 return 1;
//             if (
//                 a.children[1].innerHTML.toLowerCase() <=
//                 b.children[1].innerHTML.toLowerCase()
//             )
//                 return -1;
//             return 0;
//         });
//         // create person lists base on sorted list
//         table.innerHTML = "";
//         for (let p of sortedTable) {
//             let person = personSpecification({
//                 firstName: p.children[1].innerHTML,
//                 lastName: p.children[2].innerHTML,
//             });
//             table.insertAdjacentHTML("beforeend", person);
//         }
//         // if search input has value,then we should show items base on that value
//         if (searchInput.value) searchPersons({ target: searchInput });
//         console.log(searchInput.value !== "");
//     } else {
//         filterButton.innerHTML = `<i class="fa-solid fa-list"></i>`;
//         // create person lists base on default order
//         table.innerHTML = "";
//         for (let p of persons) {
//             let person = personSpecification({
//                 firstName: p.firstName,
//                 lastName: p.lastName,
//             });
//             table.insertAdjacentHTML("beforeend", person);
//         }
//         // if search input has value,then we should show items base on that value
//         if (searchInput.value) searchPersons({ target: searchInput });
//         console.log(searchInput.value !== "");
//     }
// }
