import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// zod: creating a schema
const schema_formdata = z.object({
  firstName: z.string().refine((s) => s.trim().length >= 2),
  username: z.string().min(2),
  email: z.string().email({ message: "Oops! Please check email" }),
});

type FormData = z.infer<typeof schema_formdata>;

// We use z.infer instead, single schema.
// type FormData = {
//   firstName: string;
//   lastName: string;
//   username: string;
// };

export default function Form_RHF_ZOD() {
  // Custom hook to manage the entire form,
  // OF TPYPE "FormData"
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema_formdata),
  });

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
        <label htmlFor="firstName" className="form-label">
          First name
        </label>
        <input
          type="text"
          id="firstName"
          {...register("firstName")}
          className="form-control"
        />
        {/* errors will return with the path when field validation fails  */}
        <div className="text-danger small">{errors.firstName?.message}</div>

        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="email"
          {...register("email")}
          className="form-control"
        />
        {/* optional error message */}
        <div className="text-danger small">{errors.email?.message}</div>
        {/* include validation with required or other standard HTML validation rules */}
        <label htmlFor="username" className="form-label">
          username*
        </label>
        <input
          type="text"
          id="username"
          {...register("username")}
          className="form-control"
        />
        <div className="text-danger small">{errors.username?.message}</div>

        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>

      {/* React Hook Form DevTools to help debug forms with validation. */}
      <DevTool control={control} />
    </div>
  );
}
