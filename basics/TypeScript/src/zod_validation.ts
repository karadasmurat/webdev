import { ZodError, z } from "zod";

// creating a schema for strings
const mySchema = z.object({
  firstName: z.string().refine((s) => s.trim().length >= 2),
  username: z.string().min(2),
  email: z.string().email({ message: "Oops! Please check email" }),
});

// parsing
mySchema.parse({
  firstName: "john",
  username: "dark",
  email: "john@example.com",
});

try {
  mySchema.parse({
    firstName: "",
    username: "dark",
    email: "john@example.com",
  }); // => throws ZodError
} catch (err) {
  console.log("We have a problem.");
  if (err instanceof z.ZodError) {
    console.log(
      err.errors.map((issue) =>
        console.log(issue.path, issue.code, issue.message)
      )
    );
  }
}

// "safe" parsing (doesn't throw error if validation fails)
// mySchema.safeParse("tuna"); // => { success: true; data: "tuna" }
// const result = mySchema.safeParse(12); // => { success: false; error: ZodError }
// console.log(JSON.stringify(result));
