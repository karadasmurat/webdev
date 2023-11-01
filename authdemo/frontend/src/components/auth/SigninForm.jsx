import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { BsLock, BsEnvelope } from "react-icons/bs";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../contexts/AuthContext";

import { GOOGLE_CLIENT_ID } from "../../config/env";
import SignInWithGoogleButton from "./SignInWithGoogleButton";

// zod: creating a schema
const schema_formdata = z.object({
  //   title: z.string().refine((s) => s.trim().length >= 2),
  email: z.string().email(),
  password: z.string(),
});

// Type aliases can only be used in TypeScript
// type FormData = z.infer<typeof schema_formdata>;

export default function SigninForm() {
  // Custom hook to manage the entire form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema_formdata) });

  // AuthContext
  const { authDispatch } = useContext(AuthContext);

  // react router navigation
  let navigate = useNavigate();

  // submit handler
  const onSubmit = (data) => {
    console.log(
      "'handleSubmit' will validate your inputs BEFORE invoking 'onSubmit'"
    );
    // console.log(data);
    axios
      .post("http://localhost:3000/api/auth/manualsignin", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        console.log("response:", response.data);

        // AuthContext - set state by dispatching an action
        console.log("dispatching type: auth/login ", response.data);
        authDispatch({
          type: "auth/login",
          payload: { user: { email: response.data.email } },
        });

        navigate("/todos");

        //clear form
        // reset();

        //callback to fetchTodos
        //onSubmitTodo();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onError = (error) => {
    // Handle errors here, e.g., displaying error messages
    console.error(error);

    // Update the UI to show error messages or take other corrective actions
  };

  return (
    // <div
    //   className="row justify-content-center align-items-center"
    //   style={{ height: "100vh" }}
    // >
    // <div className="col-md-6" style={{ maxWidth: "500px" }}></div>
    <>
      <h1 className=" text-center mb-5">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <div className="form-floating mb-3">
          <input
            type="email"
            id="email"
            {...register("email")}
            placeholder="email"
            className="form-control"
          />
          <label htmlFor="email">
            <BsEnvelope /> Email
          </label>
          {/* errors will return with the path when field validation fails  */}
          <div className="text-danger small">
            {errors.email && errors.email.message}
          </div>
          <div className="invalid-feedback">Please provide a username.</div>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            id="password"
            {...register("password")}
            placeholder="password"
            className="form-control"
          />
          <label htmlFor="password">
            <BsLock /> Password
          </label>
          {/* errors will return with the path when field validation fails  */}
          <div className="text-danger small">
            {errors.password && errors.password.message}
          </div>
          <div className="invalid-feedback">Please provide a password.</div>
        </div>
        <div className="d-grid col-xl-6 mx-auto mb-3">
          <button type="submit" className="btn btn-success">
            Sign in
          </button>
        </div>
        <p className="text-center">or</p>
      </form>

      <SignInWithGoogleButton />
      <div className="container text-center text-muted my-3">
        <hr /> Don't you have an account?{" "}
        <NavLink to="/signup">Sign Up</NavLink>
      </div>
    </>
  );
}
