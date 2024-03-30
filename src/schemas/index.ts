import z from "zod";
export const ResetSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
});

export const LoginSchema = z.object({
  email: z.string({ required_error: "Email is required." }).email(),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});

export const SignUpSchema = z
  .object({
    name: z.string({ required_error: "Username is required" }).min(2, {
      message: "Name must be at least 2 characters long",
    }),
    email: z
      .string({ required_error: "Email is required" })
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

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    passwordConfirm: z.string(),
  })
  .refine((data) => {
    return (
      (data.password = data.passwordConfirm),
      {
        message: "Passwords do not match.",
        path: ["passwordConfirm"],
      }
    );
  });
