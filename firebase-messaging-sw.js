// IMPORTANTE: Este arquivo DEVE ficar na mesma pasta raiz que o seu arquivo zap.html
// e obrigatoriamente tem que se chamar "firebase-messaging-sw.js"

importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// 1. Inicializa o app com suas credenciais do Firebase
firebase.initializeApp({
    apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
    authDomain: "sistema-chamados-99e49.firebaseapp.com",
    projectId: "sistema-chamados-99e49"
});

// 2. Inicializa o serviço de mensagens em segundo plano
const messaging = firebase.messaging();

// 3. Esta função é executada pelo SO do celular quando o app está fechado / minimizado
messaging.onBackgroundMessage(function(payload) {
  console.log('Mensagem recebida em segundo plano: ', payload);
  
  // Customiza como a notificação do celular vai aparecer
  const notificationTitle = payload.notification.title || 'Nova mensagem no Chat WG';
  const notificationOptions = {
    body: payload.notification.body || 'Você tem uma nova mensagem de texto ou áudio.',
    icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png', // O ícone que aparece na barrinha de cima
    badge: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
    vibrate: [200, 100, 200]
    // OBS: O som em segundo plano é gerido pelas configurações de notificação do próprio sistema Android/iOS.
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
