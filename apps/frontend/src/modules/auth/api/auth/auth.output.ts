import { z } from "zod";

export const LoginUserSchema = z.object({
  id: z.union([z.string(), z.number()]),
  username: z.string(),
  email: z.string().email(),
  role: z.string(),
});

export const LoginResponseSchema = z.object({
  token: z.string(),
  user: LoginUserSchema,
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type LoginUser = z.infer<typeof LoginUserSchema>;
