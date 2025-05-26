import MyProducts from "./perfume";

export default function PerfumeList({ rows }: any) {
  return (
    <div className="max-h-screen flex flex-col">
      <div className="grid gap-2  grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {rows.map((row) => (
          <div key={row.id}>
            <MyProducts row={row} />
          </div>
        ))}
      </div>
    </div>
  );
}
