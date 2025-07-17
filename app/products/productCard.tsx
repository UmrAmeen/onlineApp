export default function ProductCard({ row }: any) {
  return (
    <div className="myproduct">
      <img src={row.image} />
      <p>{row.name}</p>
      <p>{row.price}</p>
    </div>
  );
}
