// I wanted to use vanilla js for this little proejct, and personally, I'm inclined towards minimizing unnecessary bloat and stuff.

// This is also used to bind all links to the scrolling effect.
// including my menuButton ! :D

// this was thanks to Gurjit

// const smoothScroll = () => {
export default () => {
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
