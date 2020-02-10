/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "App.css",
    "revision": "2b5bee1ca0dde01c67b1311bbdac1beb"
  },
  {
    "url": "App.js",
    "revision": "d8da42b35709a7affe78992494a73ff8"
  },
  {
    "url": "assets/bird_bg.jpg",
    "revision": "e0533210249580e8a68cef0eb1453712"
  },
  {
    "url": "assets/bird.png",
    "revision": "707fb2490199336d515e043bd02b2419"
  },
  {
    "url": "assets/catch.png",
    "revision": "8629ea6e72723e17176864bb4ad6373f"
  },
  {
    "url": "assets/encyclo.png",
    "revision": "86dd2ded53e2cfbfca17b02ba3db0c96"
  },
  {
    "url": "assets/list.png",
    "revision": "a8cc6e61fcf2c74906c1b6251ee5ecf7"
  },
  {
    "url": "assets/logout.png",
    "revision": "351c737ba7cd4e5b68cdc2c05765cf33"
  },
  {
    "url": "assets/map.png",
    "revision": "0fc76b03ef7e9143b26e2cf6763f0bf6"
  },
  {
    "url": "assets/menu_square.png",
    "revision": "036d25e1c47a9af029bd14aa17a76980"
  },
  {
    "url": "assets/place.svg",
    "revision": "02f2070b4161235fe7d8909276457b53"
  },
  {
    "url": "assets/sync.png",
    "revision": "f549a9f1b3e582bcb483f6a4df21c2ff"
  },
  {
    "url": "components/AddSite.js",
    "revision": "1b1630665cfb4825b8be112d8b987f0d"
  },
  {
    "url": "components/Buttons.js",
    "revision": "b0f58bafe08bed270f0e106d07bb85d1"
  },
  {
    "url": "components/Catches.js",
    "revision": "53d5cad444421143920c1b2c570dff8b"
  },
  {
    "url": "components/CatchList.js",
    "revision": "76f0f72e1c83e102a21d968911325542"
  },
  {
    "url": "components/Connection.js",
    "revision": "d4f589e8201910aee0b709024f34ce0b"
  },
  {
    "url": "components/DisplayMap.js",
    "revision": "09af716ce8b30b4ecb69da74947d3717"
  },
  {
    "url": "components/Encyclopedia.js",
    "revision": "00e7db3b6db5260c0fff853cd888dfeb"
  },
  {
    "url": "components/Header.js",
    "revision": "73620cbe451b32fdf2ffea07c9bf2b18"
  },
  {
    "url": "components/Home.js",
    "revision": "47a4c3b6fb2b229b1dc9133e577c2d99"
  },
  {
    "url": "components/Inscription.js",
    "revision": "5c2a368a7ad0cefd61d9e7b4cbf71798"
  },
  {
    "url": "components/InscriptionInfo.js",
    "revision": "fbbcd47a66e487e2d892e8f30ae34b5b"
  },
  {
    "url": "components/Lists.js",
    "revision": "3318160ae5b0cb3bc102fbc7c68f3d65"
  },
  {
    "url": "components/Menu.js",
    "revision": "6cc378561e11d8506a61a368c0ef6a4e"
  },
  {
    "url": "components/Modifycatch.js",
    "revision": "5321e869c7432576ee682abf6dbff1c0"
  },
  {
    "url": "components/Nav.js",
    "revision": "ba2a22001968bb518d6e6d563511de88"
  },
  {
    "url": "components/UserList.js",
    "revision": "1c150556bf4db917ce973c6194917e17"
  },
  {
    "url": "fireConfig.js",
    "revision": "76f4422f42b4de7efd4fd59d71565f39"
  },
  {
    "url": "index.js",
    "revision": "dc6c7f39cffab3778e2cc9fda72c5746"
  },
  {
    "url": "provider/AuthContext.js",
    "revision": "853e59655925fdcdbe88b2d60a0139cc"
  },
  {
    "url": "routing/ProtectedRoute.js",
    "revision": "350a62bce30970db8ef37d652a1a068e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
