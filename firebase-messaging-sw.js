importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

// CONFIGURAÇÃO WG - Garanta que estes dados são idênticos ao zap.html
firebase.initializeApp({
    apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
    authDomain: "sistema-chamados-99e49.firebaseapp.com",
    projectId: "sistema-chamados-99e49",
    storageBucket: "sistema-chamados-99e49.firebasestorage.app",
    messagingSenderId: "680351942005",
    appId: "1:680351942005:web:896b35a40f094d42297f3c"
});

const messaging = firebase.messaging();

// Captura mensagens quando o utilizador está no Instagram/Facebook/Ecrã Bloqueado
messaging.onBackgroundMessage((payload) => {
    console.log('[SW] Mensagem recebida em segundo plano:', payload);

    const notificationTitle = payload.notification?.title || "WG: Nova Mensagem";
    const notificationOptions = {
        body: payload.notification?.body || "Abra o chat para ler.",
        icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png',
        tag: 'chat-wg', // Agrupa notificações para não encher o ecrã
        renotify: true,
        requireInteraction: true, // A notificação não desaparece sozinha
        vibrate: [200, 100, 200, 100, 400],
        data: {
            url: '/zap.html' // Redireciona ao clicar
        }
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Ao clicar na notificação, abre o seu app mesmo que esteja fechado
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            if (clientList.length > 0) {
                return clientList[0].focus();
            }
            return clients.openWindow('/zap.html');
        })
    );
});
