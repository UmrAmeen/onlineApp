import ProductIdCard from "./productIdCard";

  interface RowType {
    [key: string]: any;
  }
export default function ProductIdList({ rows }: any) {
  return (
    <>
      {rows.map((row:RowType) => (
        <div key={row.id}>
          <ProductIdCard row={row} />
        </div>
      ))}
    </>
  );
}
