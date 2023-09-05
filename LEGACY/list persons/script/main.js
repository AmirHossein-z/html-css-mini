let form1 = document.querySelector("#form1");
let addButton = form1.addButton;
let deleteButton = document.querySelector("#deleteSelected");
let searchInput = document.querySelector("#searchInput");
let filterButton = document.querySelector("#filterButton");

// when add button was clicked or user press 'enter' key in add person form
form1.addEventListener("submit", addPerson);
// triggers with every change in first name & last name input
form1.firstName.addEventListener("input", isValidName.bind(null, "firstName"));
form1.lastName.addEventListener("input", isValidName.bind(null, "lastName"));
// triggers with every change in search input
searchInput.addEventListener("input", searchPersons);
filterButton.addEventListener("click", filterPersons);
// when DOM and styles loaded,then persons saved in local Storage should be fetched
document.addEventListener("DOMContentLoaded", loadListPersons);

function filterPersons(event) {
    let table = document.querySelector("#showInfoTable > tbody");
    let persons = JSON.parse(localStorage.getItem("listPersons"));

    // if filter button is alphabetic shape,then it should be displayed base on alphabetic order
    if (filterButton.children[0].classList.contains("fa-list")) {
        filterButton.innerHTML = `<i class="fa-solid fa-arrow-down-a-z"></i>`;
        // sort person lists base on first name
        let sortedTable = Array.from(table.children).sort((a, b) => {
            if (
                a.children[1].innerHTML.toLowerCase() >
                b.children[1].innerHTML.toLowerCase()
            )
                return 1;
            if (
                a.children[1].innerHTML.toLowerCase() <=
                b.children[1].innerHTML.toLowerCase()
            )
                return -1;
            return 0;
        });
        // create person lists base on sorted list
        table.innerHTML = "";
        for (let p of sortedTable) {
            let person = personSpecification({
                firstName: p.children[1].innerHTML,
                lastName: p.children[2].innerHTML,
            });
            table.insertAdjacentHTML("beforeend", person);
        }
        // if search input has value,then we should show items base on that value
        if (searchInput.value) searchPersons({ target: searchInput });
        console.log(searchInput.value !== "");
    } else {
        filterButton.innerHTML = `<i class="fa-solid fa-list"></i>`;
        // create person lists base on default order
        table.innerHTML = "";
        for (let p of persons) {
            let person = personSpecification({
                firstName: p.firstName,
                lastName: p.lastName,
            });
            table.insertAdjacentHTML("beforeend", person);
        }
        // if search input has value,then we should show items base on that value
        if (searchInput.value) searchPersons({ target: searchInput });
        console.log(searchInput.value !== "");
    }
}

function searchPersons(event) {
    let persons = document.querySelectorAll("#showInfoTable > tbody > tr");

    // if desired text is matched with first name or last name of each person
    // that person should be displayed to user
    for (let index of persons.keys()) {
        if (
            persons[index].children[1].innerHTML
                .toLowerCase()
                .includes(event.target.value.toLowerCase()) ||
            persons[index].children[2].innerHTML
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        )
            persons[index].classList.remove("hidden");
        else persons[index].classList.add("hidden");
    }
}

function deletePerson(event) {
    // using beautiful alert from sweetalert2
    Swal.fire({
        title: "Are you sure to want to delete?",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#FF5252",
        confirmButtonText: "Yes",
    }).then((result) => {
        if (result.isConfirmed) {
            let tr = event.target.closest("tr");
            deleteFromLocalStorage({
                firstName: tr.children[1].innerHTML,
                lastName: tr.children[2].innerHTML,
            });
            tr.remove();
        }
    });
}

function editPerson(event) {
    let personSelected = document.querySelectorAll(
        "#showInfoTable > tbody > tr.bg-gray-700"
    );
    // Only one person can be edited at this time and other should be ignored
    personSelected.forEach((person) => person.classList.remove("bg-gray-700"));

    let tr = event.target.closest("tr");
    tr.classList.add("bg-gray-700");
    // place first name & last name of person in form to modify
    form1.firstName.value = tr.children[1].innerHTML;
    form1.firstName.focus();
    form1.lastName.value = tr.children[2].innerHTML;
    addButton.innerHTML = `<i class="fa-solid fa-check"></i>`;
}

function selectPersonForDelete(event) {
    let checkboxAll = document.querySelector("#allPerson");
    if (event.target.checked) {
        let tr = event.target.closest("tr");
        tr.classList.add("bg-gray-700");
        //  hidden oprations that relate to this person
        tr.children[tr.children.length - 1].classList.add("invisible");
        // show delete selected person button
        deleteButton.classList.remove("hidden");
        addButton.classList.add("hidden");
        filterButton.classList.add("hidden");

        // find all checkboxes that aren't checked
        // and if nothing is found ,then checkbox of table should be checked
        let arr = Array.from(
            document.querySelectorAll(
                "#showInfoTable > tbody > tr > td:first-child > input"
            )
        ).filter((item) => !item.checked);
        if (arr.length === 0) {
            checkboxAll.checked = true;
        }
    } else {
        // if one of person's checkboxes aren't checked
        // then surly checkbox of table shouldn't be checked
        checkboxAll.checked = false;
        let tr = event.target.closest("tr");
        tr.classList.remove("bg-gray-700");
        //  show oprations that relate to this tr
        tr.children[tr.children.length - 1].classList.remove("invisible");

        // find all checkboxes that are checked
        // and if nothing is found ,then user removed all
        // checkboxes of all persons and delete selected button
        // should be hidden
        let itemChecked = Array.from(
            document.querySelectorAll(
                "#showInfoTable > tbody > tr > td:first-child > input"
            )
        ).filter((item) => item.checked);
        if (itemChecked.length === 0) {
            // hidden delete selected person button
            deleteButton.classList.add("hidden");
            addButton.classList.remove("hidden");
            filterButton.classList.remove("hidden");
        }
    }
}
function checkAllPerson(event) {
    let allPersonInput = event.target;
    let operations = document.querySelectorAll(
        "#showInfoTable > tbody > tr > td:last-child"
    );
    let checkBoxInput = document.querySelectorAll(
        "#showInfoTable > tbody > tr > td:first-child > input"
    );

    // if checkbox of table was checked,then all checkboxes
    // that aren't checked, should be checked
    if (allPersonInput.checked && checkBoxInput.length !== 0) {
        // show delete selected person button
        deleteButton.classList.remove("hidden");
        addButton.classList.add("hidden");
        filterButton.classList.add("hidden");
        // find all operations that aren't displayed and hidden them
        for (let operation of operations) {
            if (!operation.classList.contains("invisible")) {
                operation.classList.add("invisible");
            }
        }
        // find all checkboxes that aren't checked
        for (let item of checkBoxInput) {
            if (!item.checked) {
                item.checked = true;
                let tr = item.closest("tr");
                tr.classList.add("bg-gray-700");
            }
        }
    } else {
        // hidden delete selected person button
        deleteButton.classList.add("hidden");
        addButton.classList.remove("hidden");
        filterButton.classList.remove("hidden");
        // find all operations that aren displayed and hidden them
        for (let operation of operations) {
            if (operation.classList.contains("invisible")) {
                operation.classList.remove("invisible");
            }
        }
        // find all items that are checked and remove their marks
        for (let item of checkBoxInput) {
            if (item.checked) {
                item.checked = false;
                let tr = item.closest("tr");
                tr.classList.remove("bg-gray-700");
            }
        }
    }
}

function deleteSelectedPerson(event) {
    // using beautiful alert from sweetalert2
    Swal.fire({
        title: "Are you sure to want to delete?",
        showCancelButton: true,
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#FF5252",
        confirmButtonText: "Yes",
    }).then((result) => {
        // delete all selected person from user
        if (result.isConfirmed) {
            let checkBoxInput = document.querySelectorAll(
                "#showInfoTable > tbody > tr > td:first-child > input"
            );
            for (let item of checkBoxInput) {
                if (item.checked) {
                    let tr = item.closest("tr");
                    deleteFromLocalStorage({
                        firstName: tr.children[1].innerHTML,
                        lastName: tr.children[2].innerHTML,
                    });
                    tr.remove();
                }
            }
            // deleteButton.classList.add("hidden");

            addButton.classList.remove("hidden");
            filterButton.classList.remove("hidden");
            event.target.closest("button").classList.add("hidden");
            document.querySelector("#allPerson").checked = false;
        }
    });
}

function deleteFromLocalStorage({ firstName, lastName }) {
    let persons = JSON.parse(localStorage.getItem("listPersons"));
    // find person that user wants to delete and delete it
    for (let index in persons) {
        if (
            persons[index].firstName === firstName &&
            persons[index].lastName === lastName
        ) {
            persons.splice(index, 1);
        }
    }
    localStorage.setItem("listPersons", JSON.stringify(persons));
}

function isValidName(Name) {
    let str = document.querySelector(`#${Name}`);
    // this regex checks if user enters english character
    // and also whitespace is valid
    let regex = /^[\s\w]{1,25}$/;
    if (regex.test(str.value)) {
        str.classList.remove("focus:outline-red-600");
        str.classList.add("focus:outline-green-500");
        return true;
    } else {
        str.classList.add("focus:outline-red-600");
        str.classList.remove("focus:outline-green-500");
        return false;
    }
}

function addToLocalStorage(person) {
    let persons = JSON.parse(localStorage.getItem("listPersons"));
    if (!persons) {
        persons = [];
    }

    persons.push(person);
    localStorage.setItem("listPersons", JSON.stringify(persons));
}

function editPersonInLocalStorage(previousPersonValues, currentPersonValues) {
    let persons = JSON.parse(localStorage.getItem("listPersons"));
    for (let p of persons) {
        if (
            p.firstName === previousPersonValues.firstName &&
            p.lastName === previousPersonValues.lastName
        ) {
            p.firstName = currentPersonValues.firstName;
            p.lastName = currentPersonValues.lastName;
        }
    }
    localStorage.setItem("listPersons", JSON.stringify(persons));
}

function isExistsInLocalStorage({ firstName, lastName }) {
    let persons = JSON.parse(localStorage.getItem("listPersons"));
    if (!persons) {
        return false;
    }
    for (let p of persons) {
        if (p.firstName === firstName && p.lastName === lastName) return true;
    }
    return false;
}

function personSpecification({ firstName, lastName }) {
    let person = `
        <tr class="flex justify-between cursor-pointer text-center text-xs sm:text-base p-1 sm:p-1.5 border-b border-gray-50 border-opacity-10 transition-all duration-300" onmouseover="this.classList.add('bg-gray-600')" onmouseout="this.classList.remove('bg-gray-600')">
            <td class="p-1 sm:p-1.5"><input type="checkbox" onchange="selectPersonForDelete(event)" /></td>
            <td class="p-1 sm:p-1.5">${firstName}</td>
            <td class="p-1 sm:p-1.5">${lastName}</td>
            <td class="p-1 sm:p-1.5">
                <a href="#" class="text-red-700 hover:text-red-900 text-xs sm:text-sm" onclick="deletePerson(event)"><i class="fa-solid fa-trash"></i></a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="#" class="text-yellow-400 hover:text-yellow-700 text-xs sm:text-sm" onclick="editPerson(event)"><i class="fa-solid fa-pen"></i></a>
            </td>
        </tr>
                  `;
    return person;
}

function addPerson(event) {
    event.preventDefault();
    if (isValidName("firstName") && isValidName("lastName")) {
        // if button of form is '+' then person should be added
        if (addButton.children[0].classList.contains("fa-plus")) {
            // if first name & last name is different
            if (
                !isExistsInLocalStorage({
                    firstName: form1.firstName.value,
                    lastName: form1.lastName.value,
                })
            ) {
                let p = personSpecification({
                    firstName: form1.firstName.value,
                    lastName: form1.lastName.value,
                });

                let table = document.querySelector("#showInfoTable > tbody");
                table.insertAdjacentHTML("beforeend", p);
                addToLocalStorage({
                    firstName: form1.firstName.value,
                    lastName: form1.lastName.value,
                });
                form1.firstName.value = "";
                form1.lastName.value = "";
            } else {
                // using beautiful alert from sweetalert2
                Swal.fire({
                    icon: "error",
                    title: "Duplicate names!",
                    text: "Enter different first name and last name",
                    confirmButtonColor: "#FF5252",
                });
            }
        } else {
            // if button of form is '✔️' then person should be edited
            let trModifed = document.querySelector(
                "#showInfoTable > tbody > tr.bg-gray-700"
            );
            // if first name & last name is different OR
            // user doesn't want to edit and wants to remain
            // default value
            if (
                !isExistsInLocalStorage({
                    firstName: form1.firstName.value,
                    lastName: form1.lastName.value,
                }) ||
                (trModifed.children[1].innerHTML === form1.firstName.value &&
                    trModifed.children[2].innerHTML === form1.lastName.value)
            ) {
                editPersonInLocalStorage(
                    {
                        firstName: trModifed.children[1].innerHTML,
                        lastName: trModifed.children[2].innerHTML,
                    },
                    {
                        firstName: form1.firstName.value,
                        lastName: form1.lastName.value,
                    }
                );
                trModifed.children[1].innerHTML = form1.firstName.value;
                trModifed.children[2].innerHTML = form1.lastName.value;
                form1.firstName.value = "";
                form1.lastName.value = "";
                trModifed.classList.remove("bg-gray-700");
                addButton.innerHTML = `<i class="fa-solid fa-plus"></i>`;
            } else {
                // using beautiful alert from sweetalert2
                Swal.fire({
                    icon: "error",
                    title: "Duplicate names!",
                    text: "Enter different first name and last name",
                    confirmButtonColor: "#FF5252",
                });
            }
        }
    } else {
        // using beautiful alert from sweetalert2
        Swal.fire({
            icon: "error",
            title: "Wrong names!",
            text: "Enter correct first name and last name",
            confirmButtonColor: "#FF5252",
        });
    }
}

// load person lists from local storage if exists!
function loadListPersons() {
    let persons = JSON.parse(localStorage.getItem("listPersons"));
    if (!persons) {
        persons = [];
    }
    let table = document.querySelector("#showInfoTable > tbody");
    for (let p of persons) {
        let person = personSpecification({
            firstName: p.firstName,
            lastName: p.lastName,
        });
        table.insertAdjacentHTML("beforeend", person);
    }

    // focus on first name input when DOM was loaded
    form1.firstName.focus();
}
