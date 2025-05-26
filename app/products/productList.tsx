import Link from "next/link";

export default function Products() {
  return (
    <div  className="grid gap-2  grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
      <div className="myproduct">
        <img src="https://aromaperfume.lk/wp-content/uploads/13012021-24-1-600x600.png" />

        <Link href="/perfumeItems">
          <p>perfumes</p>
        </Link>
      </div>
      <div className="myproduct">
        <img src="https://m.media-amazon.com/images/I/51BvYVRNYfS._AC_SY1000_.jpg"/>
        <Link href="/belts" >
        <p>BELTS</p></Link>
        </div>
    </div>
  );
}
