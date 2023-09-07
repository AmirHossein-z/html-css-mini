"use client";

import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { GoPersonAdd } from "react-icons/go";
import { BsTrash3Fill } from "react-icons/bs";
import { MdEdit, MdOutlineDone } from "react-icons/md";
import { nanoid } from "nanoid";

type IOperation = "add" | "edit";
interface IPerson {
  id: string;
  firstName: string;
  lastName: string;
}

const getPersonsListFromLS = (): Array<IPerson> => {
  const personsJSON = localStorage.getItem("listPersons");
  return personsJSON ? JSON.parse(personsJSON) : [];
};

export default function ListPerson() {
  const [firstName, setFirstName] = useState({ value: "", styles: "" });
  const [lastName, setLastName] = useState({ value: "", styles: "" });
  const [operation, setOperation] = useState<IOperation>("add");
  const [persons, setPersons] = useState<IPerson[]>(getPersonsListFromLS());
  const [checkingIds, setCheckingIds] = useState<string[]>([]);

  const deleteFromLS = (id: string) => {
    const ps = getPersonsListFromLS();
    ps.splice(
      ps.findIndex((p) => p.id === id),
      1
    );
    localStorage.setItem("listPersons", JSON.stringify(ps));
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
    } else {
      const personIds = persons.map((p) => p.id);
      setCheckingIds(personIds);
    }
  };

  const deleteSelectedPerson = (e: MouseEvent<HTMLButtonElement>) => {};

  const deletePerson = (id: string) => {
    const copyPerson = [...persons];
    copyPerson.splice(
      copyPerson.findIndex((p) => p.id === id),
      1
    );
    setPersons(copyPerson);
    deleteFromLS(id);
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

  const selectPersonForDelete = (e: ChangeEvent<HTMLInputElement>) => {};

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
      deleteFromLS(checkingIds[0]);
      addToLocalStorage(newPerson);
      setPersons([...copy, newPerson]);
      setCheckingIds([]);
    }
  };

  const handleChecking = (id: string) => {
    if (!checkingIds.includes(id)) {
      setCheckingIds([...checkingIds, id]);
    } else {
      const copy = [...checkingIds];
      copy.splice(copy.indexOf(id));
      setCheckingIds(copy);
    }
  };

  return (
    <div className="container grid">
      <h1 className="text-center text-base sm:text-xl md:text-3xl m-3 p-1 text-blue-200">
        List persons
      </h1>
      n{" "}
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
            className="cursor-pointer bg-green-500 py-1 px-2 sm:py-1.5 sm:px-3 md:px-3.5 rounded-sm text-lime-50 hover:bg-green-900 transition-all duration-300 focus:outline-green-500 focus:border-none outline-none"
          >
            {operation === "add" ? (
              <GoPersonAdd className="text-2xl" />
            ) : operation === "edit" ? (
              <MdOutlineDone className="text-2xl" />
            ) : null}
          </button>
        </div>
      </form>
      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-end sm:items-center gap-2 my-3">
        <div className="flex gap-2">
          <button
            id="deleteSelected"
            className="bg-rose-500 py-1 px-2 sm:py-1.5 md:py-2 sm:px-3 md:px-4 rounded-sm text-lime-50 hover:bg-rose-900 transition-all duration-300 hidden"
            onClick={(e) => deleteSelectedPerson(e)}
          >
            <BsTrash3Fill />
          </button>
          <button
            className="bg-zinc-700 py-1 px-2 sm:py-1.5 md:py-2 sm:px-3 md:px-4 rounded-sm text-lime-50 hover:bg-zinc-900 transition-all duration-300"
            id="filterButton"
          >
            <i className="fa-solid fa-list"></i>
          </button>
        </div>
        <div className="flex justify-center m-1 text-white">
          <input
            type="text"
            id="searchInput"
            name="searchInput"
            className="transition-all duration-200 ease-in bg-transparent rounded-sm p-1 sm:p-1.5 md:p-2 mx-1 outline-none focus:outline-none focus:border-yellow-100 placeholder:text-white placeholder:text-opacity-50 placeholder:text-xs md:placeholder:text-sm border border-white border-opacity-20"
            placeholder="Search name here..."
          />
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
          {persons.length > 0 &&
            persons.map((person) => (
              <tr
                key={person.id}
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
            ))}
        </tbody>
      </table>
    </div>
  );
}

// let form1 = document.querySelector("#form1");
// let addButton = form1.addButton;
// let deleteButton = document.querySelector("#deleteSelected");
// let searchInput = document.querySelector("#searchInput");
// let filterButton = document.querySelector("#filterButton");

// // triggers with every change in first name & last name input
// form1.firstName.addEventListener("input", isValidName.bind(null, "firstName"));
// form1.lastName.addEventListener("input", isValidName.bind(null, "lastName"));
// // triggers with every change in search input
// searchInput.addEventListener("input", searchPersons);
// filterButton.addEventListener("click", filterPersons);
// // when DOM and styles loaded,then persons saved in local Storage should be fetched
// document.addEventListener("DOMContentLoaded", loadListPersons);

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

// function searchPersons(event) {
//     let persons = document.querySelectorAll("#showInfoTable > tbody > tr");

//     // if desired text is matched with first name or last name of each person
//     // that person should be displayed to user
//     for (let index of persons.keys()) {
//         if (
//             persons[index].children[1].innerHTML
//                 .toLowerCase()
//                 .includes(event.target.value.toLowerCase()) ||
//             persons[index].children[2].innerHTML
//                 .toLowerCase()
//                 .includes(event.target.value.toLowerCase())
//         )
//             persons[index].classList.remove("hidden");
//         else persons[index].classList.add("hidden");
//     }
// }

// function selectPersonForDelete(event) {
//     let checkboxAll = document.querySelector("#allPerson");
//     if (event.target.checked) {
//         let tr = event.target.closest("tr");
//         tr.classList.add("bg-gray-700");
//         //  hidden oprations that relate to this person
//         tr.children[tr.children.length - 1].classList.add("invisible");
//         // show delete selected person button
//         deleteButton.classList.remove("hidden");
//         addButton.classList.add("hidden");
//         filterButton.classList.add("hidden");

//         // find all checkboxes that aren't checked
//         // and if nothing is found ,then checkbox of table should be checked
//         let arr = Array.from(
//             document.querySelectorAll(
//                 "#showInfoTable > tbody > tr > td:first-child > input"
//             )
//         ).filter((item) => !item.checked);
//         if (arr.length === 0) {
//             checkboxAll.checked = true;
//         }
//     } else {
//         // if one of person's checkboxes aren't checked
//         // then surly checkbox of table shouldn't be checked
//         checkboxAll.checked = false;
//         let tr = event.target.closest("tr");
//         tr.classList.remove("bg-gray-700");
//         //  show oprations that relate to this tr
//         tr.children[tr.children.length - 1].classList.remove("invisible");

//         // find all checkboxes that are checked
//         // and if nothing is found ,then user removed all
//         // checkboxes of all persons and delete selected button
//         // should be hidden
//         let itemChecked = Array.from(
//             document.querySelectorAll(
//                 "#showInfoTable > tbody > tr > td:first-child > input"
//             )
//         ).filter((item) => item.checked);
//         if (itemChecked.length === 0) {
//             // hidden delete selected person button
//             deleteButton.classList.add("hidden");
//             addButton.classList.remove("hidden");
//             filterButton.classList.remove("hidden");
//         }
//     }
// }

// function deleteSelectedPerson(event) {
//     // using beautiful alert from sweetalert2
//     Swal.fire({
//         title: "Are you sure to want to delete?",
//         showCancelButton: true,
//         confirmButtonColor: "#4CAF50",
//         cancelButtonColor: "#FF5252",
//         confirmButtonText: "Yes",
//     }).then((result) => {
//         // delete all selected person from user
//         if (result.isConfirmed) {
//             let checkBoxInput = document.querySelectorAll(
//                 "#showInfoTable > tbody > tr > td:first-child > input"
//             );
//             for (let item of checkBoxInput) {
//                 if (item.checked) {
//                     let tr = item.closest("tr");
//                     deleteFromLocalStorage({
//                         firstName: tr.children[1].innerHTML,
//                         lastName: tr.children[2].innerHTML,
//                     });
//                     tr.remove();
//                 }
//             }
//             // deleteButton.classList.add("hidden");

//             addButton.classList.remove("hidden");
//             filterButton.classList.remove("hidden");
//             event.target.closest("button").classList.add("hidden");
//             document.querySelector("#allPerson").checked = false;
//         }
//     });
// }

// function editPersonInLocalStorage(previousPersonValues, currentPersonValues) {
//     let persons = JSON.parse(localStorage.getItem("listPersons"));
//     for (let p of persons) {
//         if (
//             p.firstName === previousPersonValues.firstName &&
//             p.lastName === previousPersonValues.lastName
//         ) {
//             p.firstName = currentPersonValues.firstName;
//             p.lastName = currentPersonValues.lastName;
//         }
//     }
//     localStorage.setItem("listPersons", JSON.stringify(persons));
// }

// function isExistsInLocalStorage({ firstName, lastName }) {
//     let persons = JSON.parse(localStorage.getItem("listPersons"));
//     if (!persons) {
//         return false;
//     }
//     for (let p of persons) {
//         if (p.firstName === firstName && p.lastName === lastName) return true;
//     }
//     return false;
// }
