const chamadosRef = firebase.database().ref('chamados');
const container = document.getElementById('chamados-container');

function renderChamado(key, chamado) {
  const card = document.createElement('div');
  card.className = 'chamado-card';
  card.innerHTML = `
    <div class="chamado-header">
      <span><strong>Protocolo:</strong> ${chamado.protocolo}</span>
      <span class="status">${chamado.status}</span>
    </div>
    <p><strong>Assunto:</strong> ${chamado.assunto}</p>
    <p><strong>Mensagem:</strong> ${chamado.mensagem}</p>
    <p><strong>Criado por:</strong> ${chamado.nome}</p>
    <button class="btn btn-status" onclick="alterarStatus('${key}', '${chamado.status}')">Alterar Status</button>
    <button class="btn btn-excluir" onclick="excluirChamado('${key}')">Excluir</button>
  `;
  container.appendChild(card);
}

function carregarChamados(statusFiltro = ['Aberto', 'Em Andamento']) {
  container.innerHTML = '';
  chamadosRef.once('value', snapshot => {
    snapshot.forEach(child => {
      const chamado = child.val();
      const key = child.key;
      if (statusFiltro.includes(chamado.status)) {
        renderChamado(key, chamado);
      }
    });
  });
}

function excluirChamado(key) {
  if (confirm('Deseja realmente excluir este chamado?')) {
    chamadosRef.child(key).remove().then(() => {
      alert('Chamado excluído com sucesso!');
      carregarChamados();
    });
  }
}

function alterarStatus(key, statusAtual) {
  const novoStatus = statusAtual === 'Aberto' ? 'Em Andamento' : 'Finalizado';
  chamadosRef.child(key).update({ status: novoStatus }).then(() => {
    alert('Status alterado para: ' + novoStatus);
    carregarChamados();
  });
}

function filtrarChamados(status) {
  carregarChamados([status]);
}

carregarChamados();