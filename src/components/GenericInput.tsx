import { FC } from "react";

interface GenericProps {
  typeOf?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
  req?: boolean;
  name?: string
  placeholder?: string;
  value?: any
}

const GenericInput: FC<GenericProps> = ({ typeOf, handleChange, title, req, placeholder, value, name }) => {
  return (
    <div className=" flex flex-col ">
      <div className=" font-medium">{title}{req && <sup >*</sup>}</div>
      <input name={name} value={value} placeholder={placeholder} type={typeOf} onChange={handleChange} className=" px-2 py-2 gap-1 sm:w-[90%] w-[100%] bg-[#f5f5f5] border-0 outline-none" />
    </div>
  )
}

export default GenericInput