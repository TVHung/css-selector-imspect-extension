import { FC, useEffect, useState } from "react"

import { PUSH_POP } from "~constants/enum"
import type { CssInfor } from "~model/cssInfor"
import { arrayToString, stringToArray } from "~utils"

import Button from "./Button"

import "../../style.css"

interface InforPopupProps {
  data: CssInfor
}

const InforPopup: FC<InforPopupProps> = ({ data }) => {
  const [cssSelector, setCssSelector] = useState<string>(data.path)
  const [cssSelectorObj, setCssSelectorObj] = useState<object[]>([])
  const [copyText, setCopyText] = useState<string>("Copy")

  useEffect(() => {
    let arr = stringToArray(cssSelector, " > ")
    for (let i = 0; i < arr.length; i++) {
      let item = {
        isShow: true,
        value: arr[i]
      }
      setCssSelectorObj((cssSelector) => [...cssSelector, item])
    }
  }, [])

  console.log("rerender")

  const handlePushPopArr = (value: string, indexEdit: number) => {
    let newArr = cssSelectorObj.map((object: any, index: number) => {
      if (indexEdit === index) {
        return {
          ...object,
          isShow: value === PUSH_POP.push ? true : false
        }
      }
      return object
    })
    setCssSelectorObj(newArr)
    return newArr
  }

  const onChangeSelect = (
    event: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { value } = event.target
    let newArrObj = handlePushPopArr(value, index)
    console.log(newArrObj, cssSelectorObj)

    let newCssSelector = []
    for (let i = 0; i < newArrObj.length; i++) {
      const element = newArrObj[i]
      if (element.isShow) {
        let css = element.value
        newCssSelector.push(css)
      }
    }
    setCssSelector(arrayToString(newCssSelector, " > "))
  }

  const onCopy = () => {
    navigator.clipboard.writeText(cssSelector)
    setCopyText("Coppied")
    setTimeout(() => {
      setCopyText("Copy")
    }, 3000)
  }

  return (
    <div className="w-[500px] h-auto rounded-2xl border-2 border-gray-500 bg-black/80 text-white">
      <div className="p-4">
        <p className="text-xl pb-2">{cssSelector}</p>
        <Button className="rounded-md text-white" onClick={onCopy}>
          {copyText}
        </Button>
      </div>
      <div className="p-4 rounded-2xl border-2 bg-black/20 max-h-[300px] overflow-y-auto overflow-x-hidden">
        {cssSelectorObj.map((data: any, index: number) => (
          <div key={index}>
            <div className="grid grid-cols-2 gap-2 pb-2">
              <div className="col-span-1">
                <select
                  onChange={(event) => onChangeSelect(event, index)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value={PUSH_POP.push}>Push</option>
                  <option value={PUSH_POP.pop}>Pop</option>
                </select>
              </div>
              <div className="col-span-1 pl-2 flex justify-start items-center">
                <span
                  className={`text-base ${
                    data.isShow ? "text-white" : "line-through text-gray-500"
                  }`}>
                  {data.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InforPopup
