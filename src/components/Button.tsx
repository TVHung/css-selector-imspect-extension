import classNames from "classnames"
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react"

const Button: FC<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, className, ...props }) => {
  return (
    <button
      className={classNames(
        "px-3 py-2 text-sm font-medium text-gray-600 rounded-default cursor-pointer border-2 border-gray-300 hover:border-gray-500",
        className
      )}
      {...props}>
      {children}
    </button>
  )
}

export default Button
