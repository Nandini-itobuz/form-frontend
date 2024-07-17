import { FC } from "react";

interface ButtonProps {
  children: string | JSX.Element;
  handleClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, handleClick }) => {
  return (
    <button
      className="  md:col-span-3 col-span-6 py-2  bg-[#f5f5f5] font-bold"
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
