// scrolling navbar transparent 
const navbarClass = 'menu-wrap'
const navbarTrans = 'menu-wrap--transparent'

const navbar = document.querySelector('.menu-wrap')
let prevYPos = window.pageYOffset

window.onscroll = ( () => {
  let currentYPos = window.pageYOffset
  console.log(currentYPos)
  if (currentYPos > prevYPos) {
    navbar.classList.add(navbarTrans)
    // navbar.classList.remove(navbarTrans)
  } else {
    // navbar.classList.add(navbarTrans)
    navbar.classList.remove(navbarTrans)
  }
  prevYPos = currentYPos
})