import { useState } from "react"

import { Button } from "."

interface ButtonDropdownProps {
  optionList: object[]
  onChange: (value: any, name: string) => void
  className: string
}

const ButtonDropdown = ({
  onChange,
  className,
  optionList
}: ButtonDropdownProps) => {
  const [show, setShow] = useState(false)

  const toggleShow = () => setShow(!show)

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShow(false)
    }
  }

  return (
    <div className={`relative rounded ${className}`}>
      <Button
        className="flex flex-row justify-between items-center w-full px-4 h-12"
        onClick={toggleShow}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }>
        <span className="font-normal">Select</span>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.47329 0H8.64444C9.52691 0 9.9768 1.05974 9.36384 1.69459L5.9019 5.28017C5.51813 5.67765 4.88473 5.68858 4.48748 5.30456L0.778264 1.71899C0.131822 1.09409 0.574186 0 1.47329 0Z"
            fill={"white"}
          />
        </svg>
      </Button>
      <div
        className={`${
          show ? "block absolute inset-0 top-full" : "hidden"
        } z-10 w-full h-fit bg-white border-2 border-gray-300 rounded-default divide-y divide-gray-100 shadow mt-1`}>
        <ul className="py-2 text-sm text-gray-700">
          {optionList.map((option: any, index: number) => {
            return (
              <li
                key={index}
                className="group cursor-pointer px-4 hover:bg-gray-100">
                <span className="block py-2 border-b border-[#363636] group-last-of-type:border-b-0">
                  {option.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default ButtonDropdown
