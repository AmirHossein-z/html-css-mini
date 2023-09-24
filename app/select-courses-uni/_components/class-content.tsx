import { IClassTimes } from "../_types";

interface IClassContentProps {
  content: string;
  type: IClassTimes["type"];
}

const ClassContent = ({ content, type }: IClassContentProps) => {
  if (type === "0") {
    return (
      <div className="flex items-center justify-center">
        <p className="text-gray-900 p-2 whitespace-no-wrap">{content}</p>
      </div>
    );
  }
  if (type === "3") {
    return (
      <div className="flex items-center justify-center">
        <p className="bg-gray-500 text-white p-2 rounded whitespace-no-wrap">
          {content}
        </p>
      </div>
    );
  }

  if (type === "1") {
    return (
      <div className="flex items-center justify-center">
        <p className="bg-blue-500 text-white whitespace-no-wrap p-2 rounded">
          {content}
        </p>
      </div>
    );
  }

  if (type === "2") {
    return (
      <div className="flex items-center justify-center">
        <p className="bg-red-500 text-white whitespace-no-wrap p-2 rounded">
          {content}
        </p>
      </div>
    );
  }

  if (type === "4") {
    let copy = content.split(";");
    const zoj = copy[0];
    const fard = copy[1];
    return (
      <div className="flex items-center justify-center flex-wrap gap-1">
        <p className="bg-red-500 text-white whitespace-no-wrap p-2 rounded">
          {fard}
        </p>
        <p className="bg-blue-500 text-white whitespace-no-wrap p-2 rounded">
          {zoj}
        </p>
      </div>
    );
  }
};

export default ClassContent;
