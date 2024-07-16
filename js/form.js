import { connection } from "./connect.js";

const catalogo_produto = document.querySelector("[data-catalogo]");
const formulario = document.querySelector("[data-formulario]");
const botaoLimpar = document.querySelector(".botao_limpar");

function exibirProduto(id, imagem, nome, preco) {
    const cardProduto = document.createElement("div");
    cardProduto.className = "card_produto";
    cardProduto.innerHTML = `
    <div class="img_produto"><img src="${imagem}"></div>
    <h3 class="nome_produto">${nome}</h3>
    <div class="info_produto">
      <h4 class="preco_produto">R$${preco}</h4>
      <div class="icone_produto" data-delete data-id=${id}><span class="material-symbols-outlined">delete</span></div>
    </div>
  `;

    cardProduto.addEventListener('click', async(e) => {
        const botaoDeletar = e.target.closest('[data-delete]');

        if (botaoDeletar) {
            const cardElemento = botaoDeletar.closest('.card_produto'); // Encontra o elemento pai com a classe 'card'
            const id = botaoDeletar.dataset.id; // Salva o valor da id do produto

            if (cardElemento) {
                // Verifica se o elemento 'card' foi encontrado
                try {
                    await connection.pegarId(id);
                    cardElemento.remove();
                } catch (err) {
                    console.log(err);
                    alert('Erro ao remover o produto. Por favor, tente novamente.');
                }
            }
        }
    });

    return cardProduto;
}

async function connectionApi() {
    try {
        const conectaApi = await connection.connectionApi();
        if (conectaApi.length === 0) {
            catalogo_produto.innerHTML = '<p>Nenhum produto encontrado.</p>';
        } else {
            conectaApi.forEach((elemento) =>
                catalogo_produto.appendChild(exibirProduto(elemento.id, elemento.imagem, elemento.nome, elemento.preco))
            );
        }
    } catch {
        // Handle errors
    }
}

async function cadastrarProduto(evento) {
    evento.preventDefault();
    const nome = document.querySelector("[data-nome]").value;
    const preco = document.querySelector("[data-valor]").value;
    const imagem = document.querySelector("[data-imagem]").value;

    try {
        await connection.cadastroProduto(imagem, nome, preco);
        console.log("Produto cadastrado com sucesso!");
        formulario.reset();
        connectionApi();
    } catch {
        console.error("Erro ao cadastrar produto");
    }
}

formulario.addEventListener("submit", cadastrarProduto);

botaoLimpar.addEventListener("click", (evento) => {
    evento.preventDefault();
    formulario.reset();
});

connectionApi();