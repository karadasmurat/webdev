import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SearchBox, { SelectWithSearch } from "./SearchBox";

// zod: Define your validation schema
const schema_formdata = z.object({
  level: z.string(),
  numberOfQuestions: z.number().nonnegative(), // value must be >=0
  questionTimeLimit: z.number().nonnegative(), // value must be >=0
});

export default function QuestionForm() {
  // React Hook Form to manage the entire form
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema_formdata) });

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Example textarea
          </label>
          <textarea className="form-control" id="text" rows="3"></textarea>
        </div>
        <fieldset>
          <legend className="col-form-label">Question Type</legend>
          <div className="mb-3">
            <input
              type="radio"
              className="btn-check"
              {...register("type")}
              id="selectOne"
              value="easy"
            />
            <label className="btn" htmlFor="selectOne">
              Select One
            </label>

            <input
              type="radio"
              className="btn-check"
              {...register("type")}
              id="selectMany"
              value="medium"
            />
            <label className="btn" htmlFor="selectMany">
              Select Many
            </label>

            <input
              type="radio"
              className="btn-check"
              {...register("type")}
              id="openEnded"
              value="hard"
            />
            <label className="btn" htmlFor="openEnded">
              Open Ended
            </label>
          </div>
          {errors.type && (
            <div className="form-text text-danger">{errors.type.message}</div>
          )}
        </fieldset>
        {/* <SearchBox /> */}
        {/* https://jsonplaceholder.typicode.com/todos */}
        {/* http://localhost:3000/api/questions */}
        <SelectWithSearch url="http://localhost:3000/api/tags" />
        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
      {/* React Hook Form DevTools to help debug forms with validation. */}
      <DevTool control={control} />
    </div>
  );
}
