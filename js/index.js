if (typeof navigator.serviceWorker !== 'undefined') {
  console.log('service worker supported')

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('../sw_cached_pages.js')
      .then(registration => {
        console.log({registration})
      })
      .catch(err => {
        console.error(`error registering sw: ${err.message}`)
      })
  })
}
