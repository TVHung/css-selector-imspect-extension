import $ from "jquery"
import type { PlasmoContentScript } from "plasmo"

import { PUSH_POP } from "~constants/enum"
import { getPosition } from "~utils"

export const config: PlasmoContentScript = {
  matches: ["https://*.thinkpro.vn/*"]
}

var cssSelectorObj = []

window.addEventListener("load", () => {
  $(window).mouseenter(function (event) {
    $(
      ".css-selector-tool *, close-btn *, css-selector-header *, css-selector-content *"
    ).mouseenter(function (event) {
      event.stopPropagation()
    })
    $(event.target).css("cursor", "pointer")
    $(event.target).css("border", "1px solid red")
  })

  $(window).mouseleave(function (event) {
    $(event.target).css("border", "none")
  })

  $(window).click(function (event) {
    event.preventDefault()

    $(".close-btn-click").click(function (event) {
      console.log("close")
      $(".css-selector-tool").css("display", "none")
      event.stopPropagation()
    })
    //stop click child
    $(".css-selector-tool").click(function (event) {
      $(".select-css-selector").on("change", handlePushPopArr)
      event.stopPropagation()
    })

    clipboard()
    //get css selector current element class or div:nth(n)
    let last = getClassElementOrPosLastChild(event.target)
    //get css selector all parent
    let all_parent = generateQuerySelector(event.target.parentNode) || ""
    let cssSelector = `${all_parent} > ${last}`

    initData(cssSelector)
    showCssSelectorUi(cssSelectorObj)
    showCssSelectorStr(cssSelectorObj)
    //set postision
    let pos = getPosition(event)
    setPosition(".css-selector-tool", pos.x + 20, pos.y + 20)
    event.stopPropagation()
  })

  const getClassElementOrPosLastChild = (el) => {
    var last_str = ""
    if (el.className) {
      var classes = el.className.split(/\s/)
      for (var i = 0; i < classes.length; i++) {
        last_str += "." + classes[i]
      }
    } else {
      let pos = 0
      for (let i = 0; i < el.parentNode.children.length; i++) {
        const element = el.parentNode.children[i]
        if (element == el) pos = i
      }
      let tag = el.nodeName.toLowerCase()
      last_str = `${tag}:nth[${pos}]`
    }
    return last_str
  }

  const generateQuerySelector = (el) => {
    if (el?.tagName?.toLowerCase() == "html") return "HTML"
    var str = el?.tagName
    str += el?.id != "" ? "#" + el?.id : ""
    if (el.className) {
      var classes = el.className.split(/\s/)
      for (var i = 0; i < classes.length; i++) {
        str += "." + classes[i]
      }
    }
    return (
      generateQuerySelector(el.parentNode).toLowerCase() +
      " > " +
      str.toLowerCase()
    )
  }

  // set popup to current position
  function setPosition(className, posX, posY) {
    $(className).css("display", "block")
    $(className).css("left", `${posX + 10}px`)
    $(className).css("top", `${posY + 10}px`)
  }

  //create cssSelectorObj
  function initData(cssSelector) {
    let cssSelectorArr = cssSelector.split(" > ")
    cssSelectorObj = []
    for (let i = 0; i < cssSelectorArr.length; i++) {
      let item = {
        isShow: true,
        value: cssSelectorArr[i]
      }
      cssSelectorObj.push(item)
    }
    $(".css-selector-content").empty() //clear old css selector select
  }

  //show list item
  function showCssSelectorUi(cssSelectorObj) {
    for (let i = 0; i < cssSelectorObj.length; i++) {
      const classElement = cssSelectorObj[i]
      if (classElement.isShow) {
        let cssItem = `<div class="grid grid-cols-2 gap-2 pb-2">
                          <div class="col-span-1">
                              <select class="select-css-selector" name="${classElement.value}" index="${i}">
                                  <option value="${PUSH_POP.push}">Push</option>
                                  <option value="${PUSH_POP.pop}">Pop</option>
                              </select>
                          </div>
                          <div class="css-selector-value col-span-1">
                              <span>${classElement.value}</span>
                          </div>
                      </div>`
        $(".css-selector-content").append(cssItem)
      }
    }
  }

  //show css with condition isShow and join >
  function showCssSelectorStr(cssSelectorObj) {
    let cssShow = []
    for (let i = 0; i < cssSelectorObj.length; i++) {
      const classElement = cssSelectorObj[i]
      if (classElement.isShow) {
        cssShow.push(classElement.value)
      }
    }
    $(".css-selector-text").text(cssShow.join(" > "))
  }

  //onChange select
  function handlePushPopArr() {
    for (let i = 0; i < cssSelectorObj.length; i++) {
      if (i === parseInt($(this).attr("index"))) {
        let element = cssSelectorObj[i]
        element.isShow = $(this).val() === PUSH_POP.push ? true : false
      }
    }

    showCssSelectorStr(cssSelectorObj)
  }

  //copy
  function clipboard() {
    //Clipboard
    $(".copy-css-btn").on("click", function (e) {
      let copyText = $(".css-selector-text").text()
      navigator.clipboard.writeText(copyText)
      $(this).html("Coppied")
      setTimeout(() => {
        $(this).html("Copy")
      }, 3000)
    })
  }
})
