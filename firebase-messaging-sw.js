importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
  authDomain: "sistema-chamados-99e49.firebaseapp.com",
  projectId: "sistema-chamados-99e49",
  storageBucket: "sistema-chamados-99e49.firebasestorage.app",
  messagingSenderId: "680351942005",
  appId: "1:680351942005:web:896b35a40f094d42297f3c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "WG Informática";
  const options = {
    body: payload.notification?.body || "Nova notificação",
    icon: "/icon-192.png",
    data: payload.data || {}
  };

  self.registration.showNotification(title, options);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/tecnico.html";
  event.waitUntil(clients.openWindow(url));
});
