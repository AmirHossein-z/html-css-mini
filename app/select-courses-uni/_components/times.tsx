const times = [
  {
    value: "",
  },
  {
    value: "8:10",
  },
  {
    value: "10:12",
  },
  {
    value: "12:14",
  },
  {
    value: "14:16",
  },
  {
    value: "16:18",
  },
  {
    value: "18:20",
  },
];

export default function Times() {
  return (
    <>
      {times.map((time) => (
        <th
          key={time.value}
          scope="col"
          className="px-5 py-3 text-lg font-semibold text-center text-gray-800 bg-white border-b border-gray-200"
        >
          {time.value}
        </th>
      ))}
    </>
  );
}
