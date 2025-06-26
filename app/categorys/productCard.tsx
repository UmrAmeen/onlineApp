import Link from "next/link";

export default function ProductCard({ row }: any) {
  return (
    <div className="myproduct">
      <img src={row.image} />
      <p>{row.name}</p>
    </div>
  );
}
