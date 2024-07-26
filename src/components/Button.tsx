interface ButtonProps {
  children?: JSX.Element;
  handleClick?: () => void;
  className?: string;
}

export const Button = ({ children, handleClick, className }: ButtonProps) => {
  return (
    <button
      className={` rounded-md p-2 text-white font-bold ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
