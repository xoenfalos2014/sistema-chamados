
// Importando a referência do banco
import { chamadosRef } from "./firebase-config.js";
import { onSnapshot, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const container = document.getElementById('listaChamados');

function renderChamado(id, chamado) {
  const div = document.createElement("div");
  div.className = "chamado";
  div.innerHTML = `
    <strong>Nome:</strong> ${chamado.nome || "N/A"}<br>
    <strong>Data:</strong> ${chamado.criadoEm}<br>
    <strong>Protocolo:</strong> ${chamado.protocolo || "N/A"}<br>
    <strong>Assunto:</strong> ${chamado.assunto}<br>
    <strong>Status:</strong> ${chamado.status}<br>
    <p><strong>Mensagem:</strong> ${chamado.mensagem}</p>
    <textarea id="resposta-${id}" placeholder="Responder ao cliente...">${chamado.resposta || ""}</textarea>
    <select id="status-${id}">
      <option value="Aberto" ${chamado.status==="Aberto"?"selected":""}>Aberto</option>
      <option value="Em andamento" ${chamado.status==="Em andamento"?"selected":""}>Em andamento</option>
      <option value="Resolvido" ${chamado.status==="Resolvido"?"selected":""}>Resolvido</option>
    </select>
    <button onclick="atualizarChamado('${id}')">Salvar</button>
  `;
  container.appendChild(div);
}

function carregarChamados() {
  onSnapshot(chamadosRef, (snapshot) => {
    container.innerHTML = "";
    snapshot.forEach((doc) => {
      const chamado = doc.data();
      const id = doc.id;
      renderChamado(id, chamado);
    });
  });
}

function atualizarChamado(id) {
  const status = document.getElementById("status-" + id).value;
  const resposta = document.getElementById("resposta-" + id).value;
  const chamadoDoc = doc(chamadosRef, id);
  updateDoc(chamadoDoc, { status, resposta })
    .then(() => alert("Atualizado com sucesso!"))
    .catch((error) => console.error("Erro ao atualizar:", error));
}

carregarChamados();
