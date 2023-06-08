import { useForm, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { BsBoxArrowUpRight } from "react-icons/bs";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

// zod: creating a schema
const schema_formdata = z.object({
  title: z.string().refine((s) => s.trim().length >= 2),
  priority: z.string(),
  due: z.coerce.date(),
});

type FormData = z.infer<typeof schema_formdata>;

// We use z.infer instead, single schema.
// type FormData = {
//   firstName: string;
//   lastName: string;
//   username: string;
// };

interface TodoFormProps {
  onSubmitTodo: () => void;
}
export default function TodoForm({ onSubmitTodo }: TodoFormProps) {
  // Custom hook to manage the entire form,
  // OF TYPE "FormData"
  const {
    register,
    handleSubmit,
    reset,
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
    // console.log(data);
    axios
      .post("http://localhost:3000/api/todos", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("response:", response.data);

        //clear form
        reset();

        //callback to fetchTodos
        onSubmitTodo();
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <>
      {" "}
      <button
        className="btn btn-primary mb-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#todoform"
        aria-expanded="false"
        aria-controls="todoform"
      >
        Create Todo
      </button>
      {/* .collapse hides the content */}
      <div className="collapse" id="todoform">
        <div className="row">
          <div className="col-md-9 col-xl-6 mx-auto">
            <div className="card p-3 mb-3">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register("title")}
                  className="form-control mb-3"
                />
                {/* errors will return with the path when field validation fails  */}
                <div className="text-danger small">{errors.title?.message}</div>

                <label htmlFor="priority" className="form-label">
                  Priority
                </label>

                <select
                  id="priority"
                  {...register("priority")}
                  className="form-select mb-3"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>

                {/* optional error message */}
                <div className="text-danger small">
                  {errors.priority?.message}
                </div>

                <label htmlFor="due">Due Date</label>
                <input
                  type="date"
                  id="due"
                  {...register("due")}
                  className="form-control mb-3"
                ></input>
                {/* errors will return with the path when field validation fails  */}
                <div className="text-danger small">{errors.due?.message}</div>

                <div className="d-grid d-md-block text-end">
                  <button type="submit" className="btn btn-primary my-3">
                    <span className="d-flex align-items-center">
                      <BsBoxArrowUpRight /> &nbsp; Submit
                    </span>
                  </button>
                </div>
              </form>

              {/* React Hook Form DevTools to help debug forms with validation. */}
              <DevTool control={control} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
