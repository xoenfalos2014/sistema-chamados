importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
  authDomain: "sistema-chamados-99e49.firebaseapp.com",
  projectId: "sistema-chamados-99e49",
  messagingSenderId: "680351942005",
  appId: "1:680351942005:web:896b35a40f094d42297f3c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload=>{
  self.registration.showNotification(payload.notification.title,{
    body: payload.notification.body
  });
});