import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BsLock, BsEnvelope } from "react-icons/bs";
import { NavLink } from "react-router-dom";

// zod: creating a schema
const schema_formdata = z.object({
  //   title: z.string().refine((s) => s.trim().length >= 2),
  email: z.string().email(),
  password: z.string().min(6, { message: "Please use a strong password." }),
});

// Type aliases can only be used in TypeScript
// type FormData = z.infer<typeof schema_formdata>;

export default function SignupForm() {
  // Custom hook to manage the entire form,
  // OF TYPE "FormData"
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema_formdata) });

  // submit handler
  const onSubmit = (data) => {
    console.log(
      "'handleSubmit' will validate your inputs BEFORE invoking 'onSubmit'"
    );
    // console.log(data);
    axios
      .post("http://127.0.0.1:3000/api/auth/manualsignup", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response:", response.data);

        //clear form
        // reset();

        //callback to fetchTodos
        //onSubmitTodo();
      })
      .catch((error) => {
        console.log(error.data);
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
    //   <div className="col-md-6" style={{ maxWidth: "500px" }}>

    <>
      <h1 className=" text-center mb-5">Create your account</h1>
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

          <div className="invalid-feedback">Please provide an email.</div>
          {/* errors will return with the path when field validation fails  */}
          <div className="text-danger small">
            {errors.email && errors.email.message}
          </div>
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
          <div className="invalid-feedback">Please provide a password.</div>
          {/* errors will return with the path when field validation fails  */}
          <div className="text-danger small">
            {errors.password && errors.password.message}
          </div>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            value=""
            id="conditions"
            className="form-check-input"
          />
          <label htmlFor="conditions" className="form-check-label ms-auto">
            I agree to the terms and conditions.
          </label>
          <div className="invalid-feedback">
            You must agree before submitting.
          </div>
        </div>

        <div className="container text-center my-4">
          <button type="submit" className="btn btn-success my-3">
            Create Account
          </button>
        </div>
      </form>

      <div className="container text-center text-muted my-3">
        <hr />
        Already have an account? <NavLink to="/signin">Sign In</NavLink>
      </div>
    </>
  );
}
