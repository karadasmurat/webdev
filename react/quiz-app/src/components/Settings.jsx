import React, { useEffect } from "react";
import { useSettingsContext } from "../context/SettingsContext";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// zod: Define your validation schema
// e.target.value is a string ?
// v1 z.coerce.number()
// v2 ...register('age', { valueAsNumber: true })} (requires react-hook-form v6.12.0)
const schema_formdata = z.object({
  level: z.string(),
  numberOfQuestions: z.number().nonnegative(), // value must be >=0
  questionTimeLimit: z.number().nonnegative(), // value must be >=0
});

export default function Settings() {
  // context state, and setter.
  const { appSettings, setAppSettings } = useSettingsContext();

  useEffect(() => {
    console.log("Setting form values using the Context");
    setValue("numberOfQuestions", appSettings.numberOfQuestions);
    setValue("questionTimeLimit", appSettings.questionTimeLimit);
    setValue("level", appSettings.level);
  }, [appSettings]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({ resolver: zodResolver(schema_formdata) });

  const handleQuestionTimeLimitChange = (e) => {
    const newTimeLimit = parseInt(e.target.value);
    console.log("Settings Page: New time limit", newTimeLimit);
    setAppSettings({
      ...appSettings,
      timeLimits: { ...appSettings.timeLimits, question: newTimeLimit },
    });
  };

  const onSuccess = (formData) => {
    // Perform actions with formData on successful submission
    console.log(formData);

    // Make an API request, update state, or perform other tasks here

    // Update Context through setter provided by ContextProvider value:
    // setAppSettings(formData);
    setAppSettings({ ...appSettings, ...formData });
  };

  const onError = (error) => {
    // Handle errors here, e.g., displaying error messages
    console.error(error);

    // Update the UI to show error messages or take other corrective actions
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit(onSuccess, onError)}>
          <fieldset>
            <legend className="col-form-label">Level</legend>
            <div className="mb-3">
              <input
                type="radio"
                className="btn-check"
                {...register("level")}
                id="level-easy"
                value="easy"
              />
              <label className="btn" htmlFor="level-easy">
                Easy
              </label>

              <input
                type="radio"
                className="btn-check"
                {...register("level")}
                id="level-medium"
                value="medium"
              />
              <label className="btn" htmlFor="level-medium">
                Medium
              </label>

              <input
                type="radio"
                className="btn-check"
                {...register("level")}
                id="level-hard"
                value="hard"
              />
              <label className="btn" htmlFor="level-hard">
                Hard
              </label>
            </div>
            {errors.level && (
              <div className="form-text text-danger">
                {errors.level.message}
              </div>
            )}
          </fieldset>
          <div className="mb-3">
            <label htmlFor="timeLimit">Number of Questions</label>
            <input
              type="text"
              className="form-control"
              {...register("numberOfQuestions", { valueAsNumber: true })}
            />
            {errors.numberOfQuestions && (
              <div className="form-text text-danger">
                {errors.numberOfQuestions.message}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="timeLimit">Time Limit per Question</label>
            <input
              type="text"
              className="form-control"
              {...register("questionTimeLimit", { valueAsNumber: true })}
            />
            {errors.questionTimeLimit && (
              <div className="form-text text-danger">
                {errors.questionTimeLimit.message}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Save
          </button>
        </form>
        <NavLink to="/">Home</NavLink>
      </div>
      {/* React Hook Form DevTools to help debug forms with validation. */}
      <DevTool control={control} />
    </>
  );
}
