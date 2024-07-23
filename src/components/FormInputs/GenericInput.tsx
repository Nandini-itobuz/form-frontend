/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import { JobApplication } from "../../interfaces/jobApplication";

interface GenericInputProps {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

const GenericInput: FC<GenericInputProps> = ({ inputProps }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div key={inputProps.name} className=" sm:col-span-6 col-span-12  ">
      <div className={` flex flex-col w-[100%] gap-2 ${inputProps?.className}`}>
        <div className=" font-medium text-white">{inputProps?.title}</div>
        <input
          {...inputProps}
          placeholder={inputProps.title}
          {...register(inputProps.name as keyof JobApplication)}
          className={` p-2 gap-1 w-[100%] bg-[#37374B] border-0  rounded-md outline-none font-medium text-white  ${inputProps?.className}`}
        />
        <p className=" text-white text-[14px] font-medium flex justify-start">
          {errors[inputProps?.name!]?.message as string}
        </p>
      </div>
    </div>
  );
};

export default GenericInput;
