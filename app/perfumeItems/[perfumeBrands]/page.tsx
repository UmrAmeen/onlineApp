import db from "@/app/lib/sqlite/db";
import PerfumeBrands from "./perfumeBrands";

export default async function Perfumes({ params }: { params: any }) {
  const perfumeRows = db.prepare("SELECT * FROM perfumes").all();
  const p = await params;
  const perfumeId = await p.perfumeBrands;

  const filteredList = perfumeRows.filter((row) => {
    return row.nameId === perfumeId;
  });
  
console.log("name",filteredList)
  return (
    <div className="grid gap-2  grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      {filteredList.map((row) => (
        <div key={row.id}>
          <PerfumeBrands row={row} />
        </div>
      ))}
    </div>
  );
}
