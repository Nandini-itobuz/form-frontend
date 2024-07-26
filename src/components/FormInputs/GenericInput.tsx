import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { JobApplication } from "../../interfaces/jobApplication";
import { useController } from "react-hook-form";

interface GenericInputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const GenericInput: FC<GenericInputProps> = ({ inputProps }) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const { name } = { ...inputProps };
  const { field } = useController<HTMLInputElement, string>({
    name,
    control,
  });

  return (
    <div key={inputProps.name} className=" sm:col-span-6 col-span-12  ">
      <div className={` flex flex-col w-[100%] ${inputProps?.className}`}>
        <div className=" font-medium text-white">{inputProps?.title}</div>
        <input
          {...field}
          {...inputProps}
          placeholder={inputProps.title}
          className={` p-2 gap-1 w-[100%] bg-[#37374B] border-0 rounded-md outline-none font-medium text-white  ${inputProps?.className}`}
        />
        <p className=" text-white text-[14px] font-medium flex justify-start">
          {errors[inputProps?.name!]?.message}
        </p>
      </div>
    </div>
  );
};

export default GenericInput;
