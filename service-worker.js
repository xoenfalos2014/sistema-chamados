
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_DOMINIO",
  projectId: "SEU_PROJECT_ID",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log('[Service Worker] Mensagem recebida: ', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/icon-192.png'
  });
});
