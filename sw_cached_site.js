const cacheKey = 'v2'

// call install event
self.addEventListener('install', event => {
  console.log('service worker is installed')
})

// call activate event
self.addEventListener('activate', event => {
  console.log('service worker is active')

  // remove unwanted caches
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== cacheKey) {
            console.log('clearing old cache: ', key)
            return caches.delete(key)
          }
        })
      )
    })
  )
})

// call fetch event
self.addEventListener('fetch', event => {
  console.log('sw: fetching')

  event.respondWith(
    fetch(event.request)
      .then(res => {
        console.log(`sw: caching ${event.request}`)

        const resClone = res.clone()

        caches.open(cacheKey).then(cache => {
          cache.put(event.request, resClone)
        })

        return res
      })
      .catch(err => {
        console.log('sw:', {err})
        return caches.match(event.request)
      })
  )
})
