import { z } from "zod";
const phoneExpression: RegExp = /^[6-9]\d{9}$/;

export const applicationZodSchema = z.object({
  firstName: z.coerce.string().min(1, { message: "Please enter first name" }).min(4, { message: "Min 4 letters required" }),
  middleName: z.coerce.string().optional(),
  lastName: z.coerce.string().min(1, { message: "Please enter last name" }).min(3, { message: "Min 4 letters required" }),
  age: z.coerce.number().int().min(1, { message: "Please enter age" }).gte(18).lte(30),
  email: z.coerce.string().min(1, { message: "Please enter email id" }).email(),
  phone: z.coerce.string().min(1, {message : "Please enter phone number"}).regex(phoneExpression, "Invalid Phone Number"),
  position: z.coerce.string().min(1, { message: "Please enter position field" }),
  institution: z.coerce.string().min(1, { message: "Please enter your institution" }),
  degree: z.coerce.string().min(1, { message: "Please enter your degree" }),
  startDate: z.coerce.string().optional(),
  score: z.coerce.number().min(1, { message: "Please enter your score" }),
  yearsOfExperience: z.coerce
    .number()
    .min(2, { message: "Minimum of 2/y experience" }),
  status: z.coerce.boolean(),
});
