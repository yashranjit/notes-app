import z from "zod";

const envSchema = z.object({
  PORT: z.string().default("3000"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const registerSchema = z.object({
  name: z.string().min(2, { error: "Name is required" }).trim(),
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { error: "Minimum 8 characters" })
    .max(20, {
      error: "Max 20 characters",
    })
    .trim(),
});

const loginSchema = z.object({
  email: z.string().email().trim(),
  password: z
    .string()
    .min(8, { error: "Minimum 8 characters" })
    .max(20, {
      error: "Max 20 characters",
    })
    .trim(),
});

const noteSchema = z.object({
  title: z.string().min(1, { error: "Title is required" }),
  content: z.string().min(1, { error: "Content is required" }),
});

export { envSchema, registerSchema, loginSchema, noteSchema };
