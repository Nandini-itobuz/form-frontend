import { FC } from "react"

interface ButtonProps {
  children: string | JSX.Element;
  handleClick?: () => void
}

const Button: FC<ButtonProps> = ({ children, handleClick }) => {
  return (
    <button className=" py-2 px-10 bg-[#f5f5f5] font-bold" onClick={handleClick}>{children}</button>
  )
}

export default Button