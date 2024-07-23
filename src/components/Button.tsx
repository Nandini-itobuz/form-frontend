import { FC } from "react";

interface ButtonProps {
  children?: JSX.Element;
  handleClick?: () => void;
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, handleClick, className }) => {
  return (
    <button
      className={` rounded-md py-2 px-4 bg-[#f5f5f5] font-bold ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
