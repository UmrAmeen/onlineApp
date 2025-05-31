import MyProducts from "./perfume";

export default function PerfumeList({ rows }: any) {
  return (
    <div className="max-h-screen flex flex-col">
      <div className="myProductList">
        {rows.map((row) => (
          <div key={row.id}>
            <MyProducts row={row} />
          </div>
        ))}
      </div>
    </div>
  );
}
