export default function BeltItems({ row }: any) {
  // console.log("row", row);
  return (
    <div className="myproduct">
      <img src={row.image} />
      <p>{row.price}</p>
      <p>{row.brandName}</p>
    </div>
  );
}
