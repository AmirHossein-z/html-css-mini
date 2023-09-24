import { IClassTimes } from "./class-contents";

interface IClassContentProps {
  content: string;
  type: IClassTimes["type"];
}
const ClassContent = ({ content, type }: IClassContentProps) => {
  if (type === "0" || type === "3") {
    return (
      <div className="flex items-center">
        <p className="text-gray-900 whitespace-no-wrap">{content}</p>
      </div>
    );
  }

  if (type === "1") {
    return (
      <div className="flex items-center">
        <p className="bg-blue-900 text-white whitespace-no-wrap">{content}</p>
      </div>
    );
  }

  if (type === "2") {
    return (
      <div className="flex items-center">
        <p className="bg-red-900 text-white whitespace-no-wrap">{content}</p>
      </div>
    );
  }

  if (type === "4") {
    let copy = content.split(";");
    const zoj = copy[0];
    const fard = copy[1];
    return (
      <div className="flex items-center">
        <p className="bg-red-900 text-white whitespace-no-wrap">{fard}</p>
        <p className="bg-blue-900 text-white whitespace-no-wrap">{zoj}</p>
      </div>
    );
  }
};

export default ClassContent;
