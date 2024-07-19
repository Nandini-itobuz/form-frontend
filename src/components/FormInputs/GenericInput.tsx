import { FC, useEffect, useState } from "react";
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
  // const [errorMsg, setErrorMsg] = useState<string | undefined>("");

  // useEffect(() => {
  //   const errorObj = Object.entries(errors);
  //   const errMsg = errorObj.find((ele) => ele[0] === inputProps?.name);
  //   if (errMsg) {
  //     setErrorMsg(errMsg[1]?.message?.toString());
  //   }
  // }, []);

  return (
    <div key={inputProps.name} className=" sm:col-span-6 col-span-12  ">
      <div className=" flex flex-col w-[100%]">
        <div className=" font-medium">{inputProps?.title}</div>
        <input
          type={inputProps?.type ? inputProps?.type : "text"}
          placeholder={inputProps.title}
          {...register(inputProps.name as keyof JobApplication, {
            required: inputProps?.required ?? `${inputProps?.name} is required`,
          })}
          className=" p-2 gap-1  w-[100%] bg-[#fff] border-0 outline-none"
        />
        <p className=" text-white text-[14px] font-medium flex justify-end">
          {/* {errors[inputProps?.name!]?.message as string} */}
        </p>
      </div>
    </div>
  );
};

export default GenericInput;
