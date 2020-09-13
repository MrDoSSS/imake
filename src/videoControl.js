document.addEventListener('DOMContentLoaded', () => {
  const videoBtns = document.querySelectorAll('button.play')

  videoBtns.forEach(btn => {
    const target = document.querySelector(btn.getAttribute('data-target'))

    if (!target) return

    target.addEventListener('play', () => {
      btn.classList.add('hidden')

      setTimeout(() => {
        btn.classList.add('hide')
        btn.classList.remove('hidden')
      }, 200)

      target.setAttribute('controls', '')
    })

    target.addEventListener('pause', () => {
      btn.classList.remove('hide')
      target.removeAttribute('controls')
    })

    btn.addEventListener('click', () => target.play())
  })
})