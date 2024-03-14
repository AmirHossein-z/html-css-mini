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
          className="p-4 text-base font-semibold text-center text-gray-900 bg-white border border-gray-200"
        >
          {time.value}
        </th>
      ))}
    </>
  );
}
