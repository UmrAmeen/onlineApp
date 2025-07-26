"use client";
import Link from "next/link";

export default function ProductIdCard({ row }: any) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={row.base64Image} alt={row.name} />
      </div>
      <div className="product-details">
        <h3>{row.name}</h3>
        <p>{row.description}</p>
        <div className="product-actions">
          <span className="product-price">${row.price}</span>
          <Link href="/signUpForm">
            <button className="add-to-cart-btn">Add to Cart</button>
          </Link>
          <Link
            href={{
              pathname: "/products/productForm",
              query: { id: row.id },
            }}
          >
            <button className="add-to-cart-btn">Edit</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
