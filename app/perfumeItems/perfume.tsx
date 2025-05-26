export default function MyProducts({ row }: any) {
  return (
    <div className="myproduct">
      <img src={row.photo} />
      <p>{row.rating}</p>
      <p>{row.name}</p>
      <p>{row.price}</p>
    </div>
  );
}
