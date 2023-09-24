import { ClassContents, Times } from "./_components";

export default function SelectCoursesUni() {
  return (
    <>
      <div>
        <div className="container max-w-3xl px-4 mx-auto sm:px-8">
          <div className="py-8">
            <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
              <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
                <table
                  className="min-w-full leading-normal text-center"
                  style={{ direction: "rtl" }}
                >
                  <thead>
                    <tr className="text-right">
                      <Times />
                    </tr>
                  </thead>
                  <ClassContents />
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-lg text-center text-black">
        رنگ آبی برای روزهای زوج و رنگ قرمز برای روزهای فرد است.
      </p>
    </>
  );
}
