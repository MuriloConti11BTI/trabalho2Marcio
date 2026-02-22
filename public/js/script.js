// API BASE URL
const API_URL = 'http://localhost:3000';

// ==================== CADASTRO DE PRODUTOS_JUKA ====================
const formProduto = document.getElementById('formProduto');
if (formProduto) {
  formProduto.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const preco = document.getElementById('preco').value.trim();
    const categoria = document.getElementById('categoria').value.trim();
    const descricao = document.getElementById('descricao').value.trim();

    // Validação básica
    if (!nome || !preco || !categoria || !descricao) {
      mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
      return;
    }

    if (parseFloat(preco) < 0) {
      mostrarMensagem('O preço não pode ser negativo.', 'erro');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos_Juka`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome,
          preco: parseFloat(preco),
          categoria,
          descricao
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar produto');
      }

      mostrarMensagem('Produto cadastrado com sucesso!', 'sucesso');
      formProduto.reset();

      // Redirecionar após 1.5 segundos
      setTimeout(() => {
        window.location.href = 'produtos_Juka.html';
      }, 1500);

    } catch (error) {
      console.error('Erro:', error);
      mostrarMensagem('Erro ao cadastrar produto. Tente novamente.', 'erro');
    }
  });
}

// ==================== LISTAGEM DE PRODUTOS_JUKA ====================
const produtosContainer = document.getElementById('produtosContainer');
if (produtosContainer) {
  carregarProdutos_Juka();
}

async function carregarProdutos_Juka() {
  try {
    const response = await fetch(`${API_URL}/produtos_Juka`);

    if (!response.ok) {
      throw new Error('Erro ao carregar produtos_Juka');
    }

    const produtos_Juka = await response.json();

    if (produtos_Juka.length === 0) {
      produtosContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #aaa;">Nenhum produto cadastrado ainda.</p>';
      return;
    }

    produtosContainer.innerHTML = '';

    produtos_Juka.forEach(produto => {
      const card = document.createElement('div');
      card.className = 'produto_Juka-card';
      card.id = `produto-${produto.id}`;

      const precoFormatado = parseFloat(produto.preco).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });

      card.innerHTML = `
        <div class="produto_Juka-header">
          <div class="produto_Juka-nome">${produto.nome}</div>
          <div class="produto_Juka-preco">${precoFormatado}</div>
        </div>
        <div class="produto_Juka-categoria">${produto.categoria}</div>
        <div class="produto_Juka-descricao">${produto.descricao}</div>
        <button class="btn-apagar" data-id="${produto.id}">Apagar</button>
      `;

      produtosContainer.appendChild(card);

      // Adicionar evento de clique no botão Apagar
      const btnApagar = card.querySelector('.btn-apagar');
      btnApagar.addEventListener('click', () => deletarProduto(produto.id, card));
    });

  } catch (error) {
    console.error('Erro ao carregar produtos_Juka:', error);
    produtosContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: #f44336;">Erro ao carregar produtos_Juka. Verifique se o servidor está rodando.</p>';
  }
}

// ==================== FUNÇÕES AUXILIARES ====================
function mostrarMensagem(texto, tipo) {
  const msgElement = document.getElementById('mensagem');
  if (!msgElement) return;

  msgElement.textContent = texto;
  msgElement.className = `mensagem ${tipo}`;
  msgElement.style.display = 'block';

  // Auto-remover erro após 4 segundos
  if (tipo === 'erro') {
    setTimeout(() => {
      msgElement.style.display = 'none';
    }, 4000);
  }
}

// ==================== DELETAR PRODUTOS_JUKA ====================
async function deletarProduto(id, cardElement) {
  try {
    const response = await fetch(`${API_URL}/produtos_Juka/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Erro ao deletar produto');
    }

    // Exibir mensagem de sucesso
    alert('Produto apagado com sucesso!');

    // Remover o card do DOM com animação suave
    cardElement.style.transition = 'opacity 0.3s ease';
    cardElement.style.opacity = '0';
    
    setTimeout(() => {
      cardElement.remove();
    }, 300);

  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    alert('Erro ao deletar produto. Tente novamente.');
  }
}
