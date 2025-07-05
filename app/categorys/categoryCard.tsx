export default function CategoryCard({ row }: any) {
  return (
    <div className="myproduct">
      <img src={row.image} />
      <p>{row.name}</p>
    </div>
  );
}
