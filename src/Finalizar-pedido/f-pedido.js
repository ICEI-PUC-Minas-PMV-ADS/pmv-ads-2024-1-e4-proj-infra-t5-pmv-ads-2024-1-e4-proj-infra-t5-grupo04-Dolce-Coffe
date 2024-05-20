const creditCardButton = document.getElementById("credit-card");
const cashButton = document.getElementById("cash");
const selectedOptionElement = document.getElementById("selected-option");
creditCardButton.addEventListener("click", function() {
    selectedOptionElement.innerText = "Forma de Pagamento Selecionada: Cartão de Crédito/Débito";
});

cashButton.addEventListener("click", function() {
    selectedOptionElement.innerText = "Forma de Pagamento Selecionada: Dinheiro";
});

produtos = [];
quantidadeTotal = 0;

for (let index = 0; index < localStorage.length; index++) {
    const element = localStorage.key(index);

    if(element.includes("produto_")){
        quantidadeTotal += parseInt(localStorage.getItem(element));
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let precoTotal = parseInt(localStorage.getItem("produtoPrecoTotal"));
    document.getElementById("Subtotal").innerHTML = precoTotal;
    document.getElementById("PrecoTotal").innerHTML = precoTotal;
    document.getElementById("QuantidadeTotal").innerHTML = quantidadeTotal;
});

function finalizarPedido(){
    for (let index = 0; index < localStorage.length; index++) {
        const element = localStorage.key(index);

        if(element.includes("produto_")){

            console.log(element)

            id_produto = element.substring(8);
            quantidade_produto = localStorage.getItem(element);

            var produto = {
                "id_produto": id_produto,
                "quantidade": quantidade_produto
            };

            produtos.push(produto);
        }
    }
    console.log(produtos);

    LimpaTudoLocalStorage();

    alertify.success('Pedido Finalizado com Sucesso!');

    setTimeout(function() {
        window.location.href = "/src/Home/index.html";
    }, 2000);
}

function LimpaTudoLocalStorage(){

    //Excluir tudo relacionado, para fazer um novo pedido
    for (let index = 0; index < localStorage.length; index++) {
        const element = localStorage.key(index);
        if(element.includes("produto")){
            localStorage.removeItem(element);
        }
    }
}


