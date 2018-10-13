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
