import ProductIdCard from "./productIdCard";

interface RowType {
  [key: string]: any;
}
export default function ProductIdList({ row }: any) {
  return (
    <>
      <div key={row.id}>
        <ProductIdCard row={row} />
      </div>
    </>
  );
}
