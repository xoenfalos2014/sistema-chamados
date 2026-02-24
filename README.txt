WG Informática — Push Notifications (FCM) + Netlify

Você já tem:
- Site em https://wginfo.netlify.app
- Firebase Auth + Firestore
- VAPID key (Web Push): DcpLD1gdKre1Ac9SxTTD5RyXRqoY35FWCyLYKLN-Fz8

1) Coloque o arquivo firebase-messaging-sw.js na RAIZ do site (mesmo nível do index.html).
   Depois do deploy, isso precisa abrir:
   https://wginfo.netlify.app/firebase-messaging-sw.js

2) No tecnico.html:
   - adicione <script src="https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js"></script>
   - registre o SW e salve o token (trecho no chat do assistente)

3) Rules do Firestore:
   match /usuarios/{uid}/pushTokens/{tokenId} { allow read, write: if request.auth != null && request.auth.uid == uid; }

4) Disparo automático (Cloud Functions):
   Veja a pasta functions/. Ela envia push quando:
   - cria chamado: /chamados/{chamadoId}
   - cliente envia msg: /chamados/{chamadoId}/mensagens/{msgId} (só se autorId == usuarioId do chamado)

Deploy:
- Requer Firebase CLI + plano Blaze (billing) para Functions.
- Dentro de functions/: npm i
- Na raiz do firebase project: firebase deploy --only functions

