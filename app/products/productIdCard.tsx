import Link from "next/link";

export default function ProductIdCard({ row }: any) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={row.image} />
      </div>
      <div className="product-details">
        <h3>{row.name}</h3>
        <p>{row.description}</p>
        <div className="product-actions">
          <span className="product-price">${row.price}</span>
          <Link href="/signUpForm">
            <button className="add-to-cart-btn">Add to Cart</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
