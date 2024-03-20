import z from "zod";
export const loginSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  password: z.string({ required_error: "Password is required" }).min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const signUpSchema = z
  .object({
    username: z.string({ required_error: "Username is required" }).min(2, {
      message: "Username must be at least 2 characters long",
    }),
    email: z
      .string({ required_error: "Password is required" })
      .email("Enter an Email."),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    passwordConfirm: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Passwords do not match.",
      path: ["passwordConfirm"],
    }
  );
