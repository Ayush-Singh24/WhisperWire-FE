import z from "zod";
export const loginSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const signUpSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters long",
    }),
    email: z.string().email("Enter an Email."),
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
