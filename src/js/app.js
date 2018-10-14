const overlay = document.querySelector('.overlay')

const toggleModal = (() => {
  return {
    openModal() {
      overlay.classList.remove('-hidden')
      document.body.classList.add('noscroll')
      document.body.onkeydown = function(e) {
        e = e || window.event
        let isEsc =
          e.key === 'Escape' || e.key === 'Esc' || e.keyCode == 27 || false
        isEsc ? toggleModal.closeModal() : null
      }
    },
    closeModal() {
      overlay.classList.add('-hidden')
      document.body.classList.remove('noscroll')
    },
    closeOnEscape() {}
  }
})()

const modalFuncs = () => {
  const openIcon = document.querySelector('.logo__img')
  const closeIcon = document.querySelector('.overlay__close')
  openIcon.addEventListener('click', toggleModal.openModal)
  closeIcon.addEventListener('click', toggleModal.closeModal)
  overlay.addEventListener('click', toggleModal.closeModal)
}

const smoothScroll = () => {
  // add click event for menu button and order button
  const menuBtn = document.querySelector('.heading__btn')
  const orderNowBtn = document.querySelector('.about__btn')
  const menus = document.getElementById('menus')
  const info = document.getElementById('info')
  // menuBtn.addEventListener('click', () => menus.scrollIntoView())
  // orderNowBtn.addEventListener('click', () => info.scrollIntoView())

  const aLinks = document.querySelectorAll('.-scroll')

  // assign eventHandler to each of them.
  aLinks.forEach(node => {
    node.addEventListener('click', e => {
      e.preventDefault()

      const targetId =
        e.target.localName === 'button'
          ? e.target.baseURI.split('#')[1]
          : e.target.href.split('#')[1]

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
}

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
