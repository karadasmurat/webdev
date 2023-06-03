import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormData = {
  firstName: string;
  lastName: string;
  username: string;
};

export default function Form03RHF() {
  // Custom hook to manage the entire form,
  // OF TPYPE "FormData"
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  // console.log(useForm());

  // submit handler
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(
      "'handleSubmit' will validate your inputs BEFORE invoking 'onSubmit'"
    );
    console.log(data);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label htmlFor="firstName">First name</label>
        <input
          defaultValue="test"
          {...register("firstName")}
          className="form-control"
        />

        <label htmlFor="lastName">Last name</label>

        {/* use RegisterOptions for validation */}
        <input
          defaultValue="test"
          {...register("lastName", {
            minLength: {
              value: 2,
              message: "min 2 chars",
            },
          })}
          className="form-control"
        />
        {/* optional error message */}
        <div className="text-danger">{errors.lastName?.message}</div>
        {/* include validation with required or other standard HTML validation rules */}
        <label htmlFor="username">username*</label>
        <input
          {...register("username", { required: true })}
          className="form-control"
        />
        {/* errors will return when field validation fails  */}
        <div className="text-danger">
          {errors.username && <span>This field is required</span>}
        </div>

        <input type="submit" />
      </form>

      {/* React Hook Form DevTools to help debug forms with validation. */}
      <DevTool control={control} />
    </div>
  );
}
