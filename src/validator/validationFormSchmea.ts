import { z } from "zod";
const phoneExpression: RegExp = /^[6-9]\d{9}$/;

export const applicationZodSchema = z.object({
  firstname: z.string().min(3, { message: "Min 4 letters required" }),
  lastName: z.string().min(3, { message: "Min 4 letters required" }),
  age: z.coerce.number().int(),
  email: z.string().email(),
  phone: z.string().regex(phoneExpression, "Invalid Phone Number"),
  position: z.string(),
  institution: z.string(),
  degree: z.string(),
  score: z.coerce
    .number()
    .max(100, { message: "Enter valid marks" }),
  yearsOfExperience: z.coerce
    .number()
    .min(2, { message: "Minimum of 2/y experience" }),
  status: z.boolean(),
});

