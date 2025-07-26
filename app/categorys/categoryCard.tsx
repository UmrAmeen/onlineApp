export default function CategoryCard({ row }: any) {
  return (
    <div className="myproduct">
      <img src={row.base64Image} />
      <p>{row.name}</p>
    </div>
  );
}
