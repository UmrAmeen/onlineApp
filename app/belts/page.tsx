import db from "../lib/sqlite/db";
import BeltList from "./beltList";

export default function Belts() {
  const rows = db.prepare("SELECT * FROM belt").all();
  return (
    <>
      <BeltList rows={rows} />
    </>
  );
}
