
// Importando as funções necessárias do SDK Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, doc, updateDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// Configuração do Firebase (SDK Modular)
const firebaseConfig = {
  apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
  authDomain: "sistema-chamados-99e49.firebaseapp.com",
  projectId: "sistema-chamados-99e49",
  storageBucket: "sistema-chamados-99e49.appspot.com",
  messagingSenderId: "680351942005",
  appId: "1:680351942005:web:896b35a40f094d42297f3c"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Exportando referência para a coleção de chamados
export const chamadosRef = collection(db, 'chamados');
