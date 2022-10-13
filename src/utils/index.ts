export const getPosition = (event) => {
  var eventDoc, doc, body
  event = event || window.event
  if (event.pageX == null && event.clientX != null) {
    eventDoc = (event.target && event.target.ownerDocument) || document
    doc = eventDoc.documentElement
    body = eventDoc.body

    event.pageX =
      event.clientX +
      ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
      ((doc && doc.clientLeft) || (body && body.clientLeft) || 0)
    event.pageY =
      event.clientY +
      ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
      ((doc && doc.clientTop) || (body && body.clientTop) || 0)
  }
  let posX = event.pageX
  let posY = event.pageY
  return { x: posX, y: posY }
}

export const stringToArray = (string: string, word: string) => {
  return string.split(word)
}

export const arrayToString = (array: string[], word: string) => {
  return array.join(word)
}
