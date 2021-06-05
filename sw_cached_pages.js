const cacheKey = 'v1'

const cacheAssets = [
  'index.html',
  'about.html',
  '/css/index.css',
  '/js/index.js',
]

// call install event
self.addEventListener('install', event => {
  console.log('service worker is installed')

  event.waitUntil(
    caches.open(cacheKey).then(cache => {
      console.log('sw cache: ', {cache})
      cache.addAll(cacheAssets).then(() => self.skipWaiting())
    })
  )
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
    fetch(event.request).catch(err => {
      console.log('sw:', {err})
      caches.match(event.request)
    })
  )
})
