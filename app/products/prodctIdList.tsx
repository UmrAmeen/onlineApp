import ProductIdCard from "./productIdCard";

export default function ProductIdList({ rows }: any) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.id}>
          <ProductIdCard row={row} />
        </div>
      ))}
    </>
  );
}
