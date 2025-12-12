function shrinkMark() {
  let marks = document.querySelectorAll(".mark"),
    w

  for (let i = 0; i < marks.length; i++) {
    if (!marks[i].closest(".timeline")) {
      let width = marks[i].offsetWidth
      let height = marks[i].offsetHeight

      for (w = width; w; w--) {
        marks[i].style.width = w + "px"
        if (marks[i].offsetHeight !== height) {
          break
        }
      }

      if (w < marks[i].scrollWidth) {
        marks[i].style.width = marks[i].style.maxWidth =
          marks[i].scrollWidth + "px"
      } else {
        marks[i].style.width = w + 1 + "px"
      }
    }
  }
}

// window.addEventListener("resize", shrinkMark)
