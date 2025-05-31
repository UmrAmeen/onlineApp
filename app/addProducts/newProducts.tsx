"use client";

import { useActionState } from "react";
import CreateNewProducts from "../addproductAction";

export default function NewProducts() {
   const [state, formAction, isPending] = useActionState(CreateNewProducts, {
      success: false,
      error: "",
    });
   
  return (
    <div>
       {state.success ? <div>Success</div> : <div>{state.error}</div>}
      <form>
        <div className="NewProducts">
          <label>
            <input name="fullname" placeholder="FULL NAME" />
          </label>
          <label>
            <input name="email" placeholder="Business email" />
          </label>
          <label>
            <input name="phoneNumber" placeholder="BusinessPhone" />
          </label>
          <label>
            <input name="brandName" placeholder="BrandName" />
          </label>
          <label>
            <input name="url" placeholder="Website Url" />
          </label>
          <button className="NewProductsButton" formAction={formAction}>submit</button>
        </div>
      </form>
    </div>
  );
}
