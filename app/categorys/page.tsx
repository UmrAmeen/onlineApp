"use server"

import db from "../lib/sqlite/db";
import ProductList from "./productList";


export default async function AllProducts(prevFormState: any, formData: FormData) {
     
    const rows = db.prepare(`SELECT * FROM category WHERE parent_id = 'null'`).all();
    // console.log("data",data)
  return (
    <div className="productsDiv">
      {rows.map((row)=>(
      <div key={row.id}>
         <ProductList row={row} /> 
      </div>
      ))}
    
    </div>
  );
}
