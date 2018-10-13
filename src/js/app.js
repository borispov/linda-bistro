import { modalFuncs } from './modal.js'
import smoothScroll from './scroll.js'

// function to execute the imported/local functions in a single listener for page load.
const onLoadFuncs = () => {
  smoothScroll()
  modalFuncs()
  interactiveHeader()
}

document.addEventListener('DOMContentLoaded', onLoadFuncs)

// Header Changing Transparency.
const interactiveHeader = function() {
  const navbarTrans = 'menu-wrap--transparent'
  const navbar = document.querySelector('.menu-wrap')

  // capture Y value before scroll
  let prevYPos = window.pageYOffset

  // add onscroll eventListener on window object
  window.onscroll = () => {
    // capture Y value after scroll and compare to previous.
    // If recent scroll is higher, add transparency className, if it's lower, remove the className if exists.
    let currentYPos = window.pageYOffset
    if (currentYPos > prevYPos) {
      navbar.classList.add(navbarTrans)
    } else {
      navbar.classList.remove(navbarTrans)
    }
    // set the former scroll position to the recent latter one.
    prevYPos = currentYPos
  }
}
