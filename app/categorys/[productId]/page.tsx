import db from "@/app/lib/sqlite/db";
import ProductList from "../productList";

export default async function ProductId({params}:{params:any}) {
  
  const p = await params
        const rows = db.prepare(`SELECT * FROM category WHERE  parent_id <50`).all();
        //  console.log("rows",rows)
  
        return(
          <div className="productsDiv">
        {rows.map((row)=>(
          <div key={row.id}>
               <ProductList row={row}/>
          </div>
        ))}
          </div>
        )
}