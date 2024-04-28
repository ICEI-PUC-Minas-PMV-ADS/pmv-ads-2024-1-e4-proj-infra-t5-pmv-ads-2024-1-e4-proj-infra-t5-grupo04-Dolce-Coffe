const creditCardButton = document.getElementById("credit-card");
const cashButton = document.getElementById("cash");
const selectedOptionElement = document.getElementById("selected-option");
creditCardButton.addEventListener("click", function() {
    selectedOptionElement.innerText = "Forma de Pagamento Selecionada: Cartão de Crédito/Débito";
});

cashButton.addEventListener("click", function() {
    selectedOptionElement.innerText = "Forma de Pagamento Selecionada: Dinheiro";
});
