import BeltItems from "./beltItems";

export default function BeltList({ rows }: any) {
  return (
    <div className="myProductList">
      {rows.map((row) => (
        <div key={row.id}>
          <BeltItems row={row} />
        </div>
      ))}
    </div>
  );
}
