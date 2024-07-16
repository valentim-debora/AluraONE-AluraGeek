async function connectionApi() {
    const connection = await fetch("http://localhost:3000/produtos");
    const connectionJson = await connection.json();
    return connectionJson;
}

async function pegarId(id) {
    const connection = await fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" }
    });
    const connectionJson = await connection.json();
    return connectionJson;
}

async function cadastroProduto(imagem, nome, preco) {
    const connection = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            imagem: imagem,
            nome: nome,
            preco: preco
        })
    });

    const connectionJson = await connection.json();
    return connectionJson;
}

export const connection = {
    connectionApi,
    cadastroProduto,
    pegarId
}