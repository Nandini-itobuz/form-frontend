import { FC } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { JobApplication } from "../../interfaces/jobApplication";

interface GenericProps {
  type?: string | undefined;
  title?: string | undefined;
  required?: boolean | undefined;
  name?: string | undefined;
  placeholder?: string | undefined;
  value?: string | number | undefined;
  
}

interface GenericInputProps {
  inputProps: GenericProps;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<JobApplication>
}

const GenericInput: FC<GenericInputProps> = ({ inputProps, handleChange, register }) => {



  return (
    <div key={inputProps.name} className=" sm:col-span-6 col-span-12  ">
      <div className=" flex flex-col w-[100%]">
        <div className=" font-medium">{inputProps?.title}</div>
        <input
          // type={inputProps?.type ? inputProps?.type : "text"}
          // required={inputProps?.required ? inputProps?.required : true}
          // placeholder={inputProps.title}
          // {...registerProp(inputProps.name!
            // { onChange: handleChange }
          // )
          // }
          {...register(inputProps.name as keyof JobApplication)}
          className=" p-2 gap-1 sm:w-[90%] w-[100%] bg-[#fff] border-0 outline-none"
        />
      </div>
    </div>
  );
};

export default GenericInput;
