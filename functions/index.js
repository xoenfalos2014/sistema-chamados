// IMPORTANTE: Este ficheiro DEVE ficar na mesma pasta raiz que o seu ficheiro zap.html
// e obrigatoriamente tem que se chamar "firebase-messaging-sw.js"

importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// Inicializa a app com as suas credenciais do Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
    authDomain: "sistema-chamados-99e49.firebaseapp.com",
    projectId: "sistema-chamados-99e49",
    storageBucket: "sistema-chamados-99e49.firebasestorage.app",
    messagingSenderId: "680351942005",
    appId: "1:680351942005:web:896b35a40f094d42297f3c"
});

const messaging = firebase.messaging();

// Esta função é executada pelo SO do telemóvel quando a app está fechada / minimizada
messaging.onBackgroundMessage(function(payload) {
  console.log('Mensagem recebida em segundo plano: ', payload);
  
  // Customiza a notificação visual e a vibração
  const notificationTitle = payload.notification?.title || 'WG Informática';
  const notificationOptions = {
    body: payload.notification?.body || 'Nova mensagem.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    vibrate: [300, 100, 300, 100, 300], // Vibração forte: VIBRA-PARA-VIBRA-PARA-VIBRA
    data: {
        url: '/' // Abre a app se o utilizador clicar na notificação
    }
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
