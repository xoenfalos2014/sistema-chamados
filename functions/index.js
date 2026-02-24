const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

function buildNotification({ title, body, url, chamadoId }) {
  return {
    notification: { title, body },
    data: {
      url: url || "/tecnico.html",
      chamadoId: chamadoId || ""
    },
    // android/ios/web options can be expanded later
  };
}

async function getStaffTokens() {
  // Busca técnicos + admin + administrador
  const usersSnap = await admin.firestore()
    .collection("usuarios")
    .where("tipo", "in", ["tecnico", "admin", "administrador"])
    .get();

  const tokens = [];
  const tokenRefs = []; // para limpeza de inválidos

  for (const u of usersSnap.docs) {
    const toksSnap = await u.ref.collection("pushTokens").get();
    toksSnap.forEach(t => {
      // docId = token, mas também guardamos ref pra delete
      tokens.push(t.id);
      tokenRefs.push(t.ref);
    });
  }

  return { tokens, tokenRefs };
}

async function sendToStaff(message) {
  const { tokens, tokenRefs } = await getStaffTokens();
  if (!tokens.length) return;

  const resp = await admin.messaging().sendEachForMulticast({
    ...message,
    tokens
  });

  // Limpa tokens inválidos (opcional, mas recomendado)
  const deletes = [];
  resp.responses.forEach((r, i) => {
    if (!r.success) {
      const code = r.error?.code || "";
      // tokens expiram/ficam inválidos
      if (code.includes("registration-token-not-registered") || code.includes("invalid-argument")) {
        deletes.push(tokenRefs[i].delete().catch(() => null));
      }
    }
  });

  await Promise.allSettled(deletes);
}

// 1) Push quando abre um CHAMADO novo
exports.pushChamadoNovo = functions.firestore
  .document("chamados/{chamadoId}")
  .onCreate(async (snap, context) => {
    const chamadoId = context.params.chamadoId;
    const chamado = snap.data() || {};

    const title = "🆕 Novo chamado";
    const empresa = chamado.empresa || chamado.nome || "Cliente";
    const body = `Chamado #${chamadoId.slice(0, 6).toUpperCase()} - ${empresa}`;

    const message = buildNotification({
      title,
      body,
      url: `/tecnico.html#chamado=${chamadoId}`,
      chamadoId
    });

    await sendToStaff(message);
    return null;
  });

// 2) Push quando CLIENTE manda mensagem no chat
exports.pushMensagemCliente = functions.firestore
  .document("chamados/{chamadoId}/mensagens/{msgId}")
  .onCreate(async (snap, context) => {
    const msg = snap.data() || {};
    const chamadoId = context.params.chamadoId;

    const chamadoSnap = await admin.firestore().doc(`chamados/${chamadoId}`).get();
    if (!chamadoSnap.exists) return null;

    const chamado = chamadoSnap.data() || {};
    const clienteUid = chamado.usuarioId;

    // Só dispara se for mensagem do cliente (autorId == usuarioId do chamado)
    if (!clienteUid || msg.autorId !== clienteUid) return null;

    const title = "💬 Nova mensagem do cliente";
    const autor = msg.usuario || "Cliente";
    const body = `Chamado #${chamadoId.slice(0, 6).toUpperCase()} - ${autor}`;

    const message = buildNotification({
      title,
      body,
      url: `/chat-tecnico.html?id=${chamadoId}`,
      chamadoId
    });

    await sendToStaff(message);
    return null;
  });
