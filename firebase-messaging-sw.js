self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const DEFAULT_URL = "https://tiktake.net/";
  const url =
    event.notification?.data?.FCM_MSG?.notification?.click_action ||
    event.notification?.data?.fcmOptions?.link ||
    event.notification?.data?.data?.link ||
    DEFAULT_URL;
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientsArray) => {
      const hadWindowToFocus = clientsArray.some((windowClient) => (windowClient.url === url ? (windowClient.focus(), true) : false));
      if (!hadWindowToFocus) clients.openWindow(url).then((windowClient) => (windowClient ? windowClient.focus() : null));
    })
  );
});

importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.5.2/firebase-messaging-compat.js");

const app = firebase.initializeApp({
  apiKey: "AIzaSyDS4b0tWknAAfRvYcfV8HgmYaAUeC2YSdI",
  authDomain: "tiktake-74525.firebaseapp.com",
  projectId: "tiktake-74525",
  storageBucket: "tiktake-74525.firebasestorage.app",
  messagingSenderId: "151576173676",
  appId: "1:151576173676:web:a843ff49a9a001a9210c49",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  let title = payload.data.title || payload.notification.title;
  let body = payload.data.body || payload.notification.body;
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
    icon: "/icons/192.png",
    data: payload,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
}, false);
