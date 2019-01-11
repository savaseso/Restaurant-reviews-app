
const cacheName = 'v1';

const cacheAssets = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];


//Call Install Event
self.addEventListener('install', (e)=>{
    console.log('service worker: installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache =>{
                cache.addAll(cacheAssets);
            })
            .then(()=>self.skipWaiting())
    );
});

//Call activate event

self.addEventListener('activate', (e)=>{
    console.log('service worker: Activated')
    //remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service worker:Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

//Call Fetch event

self.addEventListener('fetch', e=>{
    e.respondWith(fetch(e.request).catch(()=> caches.match(e.request))
    )
})