import { FC } from "react";

interface GenericProps {
  type?: string;
  title?: string;
  required?: boolean;
  name?: string;
  placeholder?: string;
  value?: string | number;
}

interface GenericInputProps {
  inputProps: GenericProps;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const GenericInput: FC<GenericInputProps> = ({ inputProps, handleChange }) => {
  return (
    <div key={inputProps.name} className=" sm:col-span-6 col-span-12 ">
      <div className=" flex flex-col ">
        <div className=" font-medium">{inputProps?.title}</div>
        <input
          {...inputProps}
          required={inputProps?.required ? inputProps?.required : true}
          type={inputProps?.type ? inputProps?.type : "text"}
          onChange={handleChange}
          className=" px-2 py-2 gap-1 sm:w-[90%] w-[100%] bg-[#f5f5f5] border-0 outline-none"
        />
      </div>
    </div>
  );
};

export default GenericInput;
