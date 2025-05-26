import db from "@/app/lib/sqlite/db";
import BeltBrands from "./beltBrands";

export default async function Belts({ params }: { params: any }) {
  const beltRows = db.prepare("SELECT * FROM belt").all();
  const p = await params;
  const beltId = await p.beltBrands;

  const filteredList = beltRows.filter((row) => {
    return row.nameId === beltId;
  });
//   console.log("filterlist",filteredList)
  return (
    <>
      {filteredList.map((row) => (
        <div key={row.id} >
          <BeltBrands row={row}/>
        </div>
      ))}
    </>
  );
}
