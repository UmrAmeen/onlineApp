export default function BeltBrands({row}:any) {
    
  return (
    <>
      <div className="myproduct">
        <img src={row.image} />
        <p>{row.price}</p>
        <p>{row.brandName}</p>
      </div>
    </>
  );
}
