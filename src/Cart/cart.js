var produtos = [];
var valorTotal = 0;

document.addEventListener('DOMContentLoaded', function() {

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

            valorProduto = 30.00;
            valorProdutoXQuantidade = valorProduto * quantidade_produto;
            valorTotal += valorProdutoXQuantidade;

            produtos.push(produto);

            document.getElementById("produtos").innerHTML += "<tr>"+
                                                                "<td>" +
                                                                    "<div class='product'>" +
                                                                        "<img src='https://picsum.photos/90/90'>" +
                                                                        "<div class='info'>" +
                                                                        "<div class='title'>Nome do 'Produto_"+id_produto+"'</div>" +
                                                                        "</div>" +
                                                                    "</div>" +
                                                                "</td>" +
                                                                "<td>R$ <span id='precoProduto_"+id_produto+"'>"+valorProduto+"</span></td>" +
                                                                "<td>"+
                                                                    "<div class='qty'>"+
                                                                        "<button id='buttonDiminuirProduto' onclick='excluirProduto("+id_produto+")'><i class='bi bi-trash3-fill'></i></button>"+
                                                                        "<button onclick='subtrairProduto("+id_produto+")'><i class='bi bi-dash'></i></button>"+
                                                                        "<span id='quantidadeProduto_"+id_produto+"'>"+quantidade_produto+"</span>"+
                                                                        "<button onclick='aumentarProduto("+id_produto+")'><i class='bi bi-plus'></i></button>"+
                                                                    "</div>"+
                                                                "</td>"+
                                                            "</tr>";
        }
    }

    document.getElementById("total-price").innerHTML = valorTotal;
    console.log(produtos);
});

function excluirProduto(id_produto){
    localStorage.removeItem("produto_"+id_produto);

    setTimeout(function(){
        location.reload();
    }, 1000);
    console.log("excluir");
}

function subtrairProduto(id_produto){
    let quantidade = parseInt(localStorage.getItem("produto_"+id_produto));
    localStorage.removeItem("produto_"+id_produto);

    if(quantidade > 1){
        quantidade -= 1
        somaTotal(id_produto, "subtrair");
    }
    
    localStorage.setItem('produto_'+id_produto, quantidade);
    document.getElementById("quantidadeProduto_"+id_produto).innerHTML = quantidade;
     
}

function aumentarProduto(id_produto){
    let quantidade = parseInt(localStorage.getItem("produto_"+id_produto));
    localStorage.removeItem("produto_"+id_produto);

    quantidade += 1
    localStorage.setItem('produto_'+id_produto, quantidade);

    document.getElementById("quantidadeProduto_"+id_produto).innerHTML = quantidade;

    somaTotal(id_produto, "somar");
}

function somaTotal(id_produto, operacao){
    var preco = parseFloat($("#precoProduto_"+id_produto).text());
    var precoTotal = parseFloat($("#total-price").text());
    
    if(operacao == "subtrair"){
        document.getElementById("total-price").innerHTML = precoTotal - preco;
    }
    else{
        document.getElementById("total-price").innerHTML = precoTotal + preco;
    }

}

function finalizar(){
    var precoTotal = parseFloat($("#total-price").text());
    localStorage.setItem('produtoPrecoTotal', precoTotal);
}