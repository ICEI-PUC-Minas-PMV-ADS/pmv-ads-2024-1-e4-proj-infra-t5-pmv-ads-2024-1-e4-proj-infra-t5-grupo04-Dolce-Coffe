
  function addCart(id_produto){

    var produto = localStorage.getItem("produto_"+id_produto);

    if(produto == null || produto == undefined){
      localStorage.setItem('produto_'+id_produto, 1);
    }
    else{
      let quantidade = parseInt(localStorage.getItem("produto_"+id_produto));
      localStorage.removeItem("produto_"+id_produto);

      quantidade += 1
      localStorage.setItem('produto_'+id_produto, quantidade);
    }

    alertify.success('Produto Adicionado ao Carrinho!');
    changeNumberCart();
  }

  function changeNumberCart(){
    quantidadeTotal = 0;
    
    for (let index = 0; index < localStorage.length; index++) {
        const element = localStorage.key(index);
    
        if(element.includes("produto_")){
            quantidadeTotal += parseInt(localStorage.getItem(element));
        }
    }

    document.getElementById("numberCart").innerHTML = quantidadeTotal;

  }