import ProductCard from "./productCard";

export default function ProductList({ rows }: any) {
  return (
    <div className="productsDiv">
      {rows.map((row) => (
        <div key={row.id}>
          <ProductCard row={row} />
        </div>
      ))}
    </div>
  );
}
