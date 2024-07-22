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
      <div className=" flex flex-col w-[100%]">
        <div className=" font-medium text-white">{inputProps?.title}</div>
        <input
          {...inputProps}
          placeholder={inputProps.title}
          {...register(inputProps.name as keyof JobApplication)}
          className={` p-2 gap-1  w-[100%] bg-[#fff] border-0 outline-none ${inputProps?.className}`}
        />
        <p className=" text-white text-[14px] font-medium flex justify-start">
          {errors[inputProps?.name!]?.message as string}
        </p>
      </div> 
    </div>
  );
};

export default GenericInput;
