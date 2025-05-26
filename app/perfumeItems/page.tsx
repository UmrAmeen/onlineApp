import db from "../lib/sqlite/db";
import PerfumeList from "./perfumLIst";

export default function PerfumeItems() {
  const rows = db.prepare("SELECT * FROM perfumes").all();
  return (
    <>
      <PerfumeList rows={rows} />
    </>
  );
}
