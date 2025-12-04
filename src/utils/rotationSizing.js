const allRotated = document.querySelectorAll(".rotation")
if (allRotated) {
  allRotated.forEach((el, index) => {
    //count the number of letter
    const longueur = el.innerHTML.length
    //set css prop to adjust the span
    el.style.setProperty("--longueur", longueur)
    //find the parent container
    const container = el.parentNode.parentNode
    //set css prop to adjust the parent container
    container.classList.add("hasRotated")
    container.style.setProperty("--longueur", longueur)
    //fint the direct parent
    const parent = el.parentNode
    //set position: relative
    parent.classList.add("relative", "rotatedParent")
  })
}
