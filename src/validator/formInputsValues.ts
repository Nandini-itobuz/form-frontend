import { JobApplication } from "../interfaces/jobApplication";
import { ValidationResponse } from "../interfaces/validationResponse";

export const validateInputValues = (formData: JobApplication | undefined) : ValidationResponse => {
  if (
    !formData?.firstName ||
    !formData?.lastName ||
    formData?.age === 0 ||
    !formData?.email ||
    formData?.score === 0 ||
    !formData?.degree ||
    formData?.yearsOfExperience === 0 ||
    !formData?.position ||
    !formData?.institution
  ) {
		return { success: false, message: "Enter requied feilds!" };
  }

  const emailExpression: RegExp = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  const emailResult: boolean = emailExpression.test(String(formData?.email));

  if (!emailResult) {
    return { success: false, message: "Incorrect Email ID" };
  }

  const phoneExpression: RegExp = /^[6-9]\d{9}$/;
  const phoneResult: boolean = phoneExpression.test(String(formData?.phone));
  if (!phoneResult) {
    return { success: false, message: "Incorrect Phone Number" };
  }

  const currentDate = new Date();
  const formDate = new Date(String(formData?.startDate));
  if (formDate > currentDate) {
    return { success: false, message: "Date cannot be future date" };
  }

  return { success: true, message: "Success" };
};
