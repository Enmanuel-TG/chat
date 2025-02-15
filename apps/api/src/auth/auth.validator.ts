import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({ required_error: "Name is required" }),
    email: z.string({  required_error: "Email is required" }).email(),
    number: z.string({required_error: "Number is required"}).min(10),
    password: z.string({required_error: "Password is required"}).min(4),
});

export const loginSchema = z.object({
    email: z.string({ required_error: "Email is required" }).email(),
    password: z.string({ required_error: "Password is required" }).min(4),
});
