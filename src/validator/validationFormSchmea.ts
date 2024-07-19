import { z } from "zod";
const phoneExpression: RegExp = /^[6-9]\d{9}$/;

export const applicationZodSchema = z.object({
  firstName: z.coerce.string().min(3, { message: "Min 4 letters required" }),
  middleName: z.optional(z.string().min(3, { message: "Min 4 letters required" })),
  lastName: z.coerce.string().min(3, { message: "Min 4 letters required" }),
  age: z.coerce.number().int().gte(18).lte(30),
  email: z.coerce.string().email(),
  phone: z.coerce.string().regex(phoneExpression, "Invalid Phone Number"),
  position: z.coerce.string(),
  institution: z.coerce.string(),
  degree: z.coerce.string(),
  startDate: z.optional(z.coerce.string()),
  feildOfStudy: z.optional(z.coerce.string()),
  score: z.coerce.number(),
  yearsOfExperience: z.coerce
    .number()
    .min(2, { message: "Minimum of 2/y experience" }),
  status: z.coerce.boolean(),
});
