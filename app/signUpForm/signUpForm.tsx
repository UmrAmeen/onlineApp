"use client";

import { useActionState } from "react";
import { CreateSignUpForm } from "../action";

export default function SignUpForm() {
  const [state, formAction, isPending] = useActionState(CreateSignUpForm, {
    success: false,
    error: "",
  });
 
  return (
    <div>
      {state.success ? <div>Success</div> : <div>{state.error}</div>}
      <form className="signUpForm">
        <label>
          name:
          <input name="name" placeholder="name" />
        </label>
        <label>
          Email:
          <input name="email" placeholder="Email" />
        </label>
        <label>
          number:
          <input   name="number" placeholder="number" />
        </label>
        <button type="submit" className="loginButton"  disabled={isPending} formAction={formAction}>
          LOGIN
        </button>
      </form>
    </div>
  );
}
