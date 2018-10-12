// scrolling navbar transparent
const navbarClass = 'menu-wrap'
const navbarTrans = 'menu-wrap--transparent'

const navbar = document.querySelector('.menu-wrap')
let prevYPos = window.pageYOffset

window.onscroll = () => {
  let currentYPos = window.pageYOffset
  if (currentYPos > prevYPos) {
    navbar.classList.add(navbarTrans)
  } else {
    navbar.classList.remove(navbarTrans)
  }
  prevYPos = currentYPos
}

// add click event for menu button to scroll into Menus sections
const menuButton = document.querySelector('.heading__btn')
const menus = document.getElementById('menus')
menuButton.addEventListener('click', () => menus.scrollIntoView())

// Smooth Scrolling Implementation.  Credits to: Gurjit Singh -- for writing Medium article on the subject.

// grab all anchor tags that have scroll class
const aLinks = document.querySelectorAll('.-scroll')

// assign eventHandler to each of them.
aLinks.forEach(node => {
  node.addEventListener('click', e => {
    e.preventDefault()

    const targetId = e.target.href.split('#')[1]

    const targetNode = document.getElementById(targetId)

    const anim = requestAnimationFrame(timestamp => {
      const stamp = timestamp || new Date().getTime()
      const duration = 1200
      const start = stamp

      const startOffset = window.pageYOffset

      const scrollEndElemTop = targetNode.getBoundingClientRect().top

      scrollToNode(start, stamp, duration, scrollEndElemTop, startOffset)
    })
  })
})

// Gurjit's Magic .!.

const easyInCubic = t => t * t * t
// Gurjit's Magic function
const scrollToNode = (startTime, currentTime, dur, targetPos, startPos) => {
  const runtime = currentTime - startTime
  let progress = runtime / dur

  progress = Math.min(progress, 1)

  const ease = easyInCubic(progress)

  window.scroll(0, startPos + targetPos * ease)

  if (runtime < dur) {
    requestAnimationFrame(timestamp => {
      const currentTime = timestamp || new Date().getTime()
      scrollToNode(startTime, currentTime, dur, targetPos, startPos)
    })
  }
}
