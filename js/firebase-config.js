
// Importando as funções necessárias do SDK Firebase (Compat)
const firebaseConfig = {
  apiKey: "AIzaSyBOc-qReOgBoDWQOYVNSlNMgRjF_hfH6uw",
  authDomain: "sistema-chamados-99e49.firebaseapp.com",
  projectId: "sistema-chamados-99e49",
  storageBucket: "sistema-chamados-99e49.appspot.com",
  messagingSenderId: "680351942005",
  appId: "1:680351942005:web:896b35a40f094d42297f3c"
};

// Inicializando o Firebase (Compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
