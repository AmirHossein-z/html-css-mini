import { MdEdit } from "react-icons/md";
import { BsTrash3Fill } from "react-icons/bs";
import { IPerson } from "../_types";

interface IPersonDataProps {
  person: IPerson;
  checkingIds: string[];
  handleChecking: (id: string) => void;
  deletePerson: (id: string) => void;
  editPerson: (person: IPerson) => void;
}

function PersonData({
  person,
  checkingIds,
  handleChecking,
  deletePerson,
  editPerson,
}: IPersonDataProps) {
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
}

export default PersonData;
