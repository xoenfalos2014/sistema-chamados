const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Inicializa o acesso de Administrador à base de dados
admin.initializeApp();

exports.enviarNotificacaoChat = functions.firestore
    .document('chat_equipe/{mensagemId}')
    .onCreate(async (snap, context) => {
        const mensagem = snap.data();
        const senderId = mensagem.senderId;
        const receiverId = mensagem.receiverId;

        // Se não houver destinatário específico, cancelamos
        if (!receiverId) return null;

        try {
            // 1. Obter o nome de quem enviou a mensagem
            const senderDoc = await admin.firestore().collection('usuarios').doc(senderId).get();
            const senderName = senderDoc.exists ? senderDoc.data().nome : 'Colega da Equipa';

            // 2. Obter os dados de quem vai receber a mensagem
            const receiverDoc = await admin.firestore().collection('usuarios').doc(receiverId).get();
            if (!receiverDoc.exists) return null;

            const receiverData = receiverDoc.data();
            const fcmToken = receiverData.fcmToken;

            if (!fcmToken) {
                console.log(`O utilizador ${receiverId} não tem um fcmToken configurado.`);
                return null;
            }

            // 3. Montar o texto do balão
            let textoNotificacao = mensagem.text || "Nova mensagem";
            if (mensagem.audioData) textoNotificacao = "🎵 Mensagem de Áudio";
            else if (mensagem.fileUrl) textoNotificacao = "📎 Anexo recebido";
            else if (mensagem.location) textoNotificacao = "📍 Localização partilhada";

            // 4. PREPARAR PACOTE COM "CÓDIGO DE EMERGÊNCIA" PARA ACORDAR O TELEMÓVEL
            const payload = {
                token: fcmToken,
                notification: {
                    title: `WG: ${senderName}`,
                    body: textoNotificacao,
                },
                // CONFIGURAÇÃO ANDROID: Acorda o ecrã e fura a poupança de bateria
                android: {
                    priority: 'high',
                    notification: {
                        sound: 'default',
                        defaultSound: true,
                        defaultVibrateTimings: true,
                        priority: 'max'
                    }
                },
                // CONFIGURAÇÃO NAVEGADOR / PWA: Urgência Alta para o Chrome não silenciar
                webpush: {
                    headers: {
                        Urgency: 'high'
                    },
                    notification: {
                        requireInteraction: true, // Fica no ecrã até a pessoa tocar
                        vibrate: [300, 100, 300, 100, 300], // Vibração forte
                        icon: 'https://cdn-icons-png.flaticon.com/512/1005/1005141.png'
                    }
                },
                // CONFIGURAÇÃO IPHONE (iOS): Prioridade máxima
                apns: {
                    headers: {
                        'apns-priority': '10'
                    },
                    payload: {
                        aps: {
                            sound: 'default'
                        }
                    }
                }
            };

            // 5. Disparar a notificação
            const response = await admin.messaging().send(payload);
            console.log('Notificação PUSH enviada com sucesso (Prioridade Alta):', response);
            
            return null;

        } catch (error) {
            console.error('Falha ao tentar enviar notificação:', error);
            return null;
        }
    });
