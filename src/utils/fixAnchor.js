const anchors = document.querySelectorAll(
  ":not(input,script,header,nav,form,select,textarea,.popover,#app,#scroll,#nav,#result)[id]"
)
if (anchors) {
  anchors.forEach((anchor) => {
    anchor.style.paddingTop = "100px"
    anchor.style.marginTop = "-100px"
    anchor.style.display = "block"
  })
}
