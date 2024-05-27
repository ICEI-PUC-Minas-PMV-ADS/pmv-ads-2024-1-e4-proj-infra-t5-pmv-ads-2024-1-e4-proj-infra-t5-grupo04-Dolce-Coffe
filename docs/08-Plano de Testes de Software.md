# Plano de Testes de Software

| **Caso de Teste** 	| **CT-01 – Cadastro e login usando credenciais.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-01 - O sistema deve permitir que os clientes criem uma conta e faça login. |
| Objetivo do Teste 	| Verificar se o usuário consegue se cadastrar e logar na aplicação. |
| Passos 	| - Acessar o serviço <br> - Clicar no botão cadastrar <br> - Preencher os campos obrigatórios (Nome, E-mail, Senha, Confirmação de Senha)  - Clicar em "Cadastra" <br> - Logar com seu usuário e senha cadastrados e verificar se o usuário foi logado.|
|Critério de Êxito | - O cadastro foi realizado com sucesso e salvo no sistema |

| **Caso de Teste** 	| **CT-02 – Adicionar produtos ao carrinho**	|
|:---:	|:---:	|
|Requisito Associado | RF-02 - O sistema deve permitir que os clientes adicionem produtos a um carrinho de compras. |
| Objetivo do Teste 	| Adicionar os produtos no carrinho |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado)<br> - Clicar no botão "Entrar" <br> - Preencher os dados solicitados <br> - Clicar em "Login" <br> - Navegar até a página do produto desejado. Pressionar o botão "Adicionar ao carrinho 🛒 de compras ". <br> - |
|Critério de Êxito | - O cliente conseguiu adicionar um produto ao seu carrinho de compras. |
|  	|  	|

| **Caso de Teste** 	| **CT-03 – Finalizar compra a partir do carrinho de compras**	|
|:---:	|:---:	|
|Requisito Associado | RF-03 -  O sistema deve permitir que os clientes concluam a compra a partir do carrinho.| 
| Objetivo do Teste 	| Verificar se o usuário *Cliente* obtém êxito ao adicionar um produto ao carrinho de compras e ao efetuar uma compra. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado)<br> - Clicar no botão "Entrar" <br> - Preencher os dados solicitados <br> - Clicar em "Login" <br> - Navegar até a página do produto desejado. <br> - Na página do produto, pressionar o botão "Adicionar ao carrinho 🛒 de compras ". <br> - Acessar o carrinho. <br> - Pressionar botão  "Confirmar" <br>   |
|Critério de Êxito | - O cliente conseguiu adicionar um produto ao seu carrinho de compras e finalizar na tela de resumo com a escolha do  metodo de pagamento. |
|  	|  	|

| **Caso de Teste** 	| **CT-04 – Navegação do Menu **	|
|:---:	|:---:	|
|Requisito Associado | RF-04 -O menu deverá permitir o usuário navegar entre as seguintes telas: pedidos, cardápio, histórico de pedidos, meu perfil. |
| Objetivo do Teste 	| Verificar se o usuário *Cliente* obtém êxito ao navegar no menu. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Navegar no menu atráves dos botões.   |
|Critério de Êxito | - O cliente conseguiu navegar pelo menu. |
|  	|  	|

| **Caso de Teste** 	| **CT-05 – Iniciar pedido e cancelar **	|
|:---:	|:---:	|
|Requisito Associado | RF-05 - O sistema deve permitir iniciar o pedido ou cancelar na própria tela do carrinho. |
| Objetivo do Teste 	| Verificar se o usuário *Cliente* obtém êxito ao cancelar o pedido  no carinho de compra. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Escolher o produto do Cárdapio <br> Adicionar  no carrinho de compras e cancelar o pedido.   |
|Critério de Êxito | - O cliente conseguiu cancelar pedido. |
|  	|  	|

| **Caso de Teste** 	| **CT-06 – Excluir produto do carrinho **	|
|:---:	|:---:	|
|Requisito Associado | RF-06 -O sistema deve permitir excluir pedidos do carrinho	| Verificar se o usuário *Cliente* obtém êxito para excluir produto do carrinho. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Escolher o produto do Cárdapio <br> Adicionar  no carrinho de compras e clicar no icone "-" para retirar o produto do carrinho. |
|Critério de Êxito | - O cliente conseguiu excluir o produto do carrinho. |
|  	|  	|

| **Caso de Teste** 	| **CT-07 – Status do pedido **	|
|:---:	|:---:	|
|Requisito Associado | RF-07 - O sistema deve permitir que os clientes acompanhem o status de seus pedidos, desde o momento da realização até a entrega	| Verificar se o usuário *Cliente* obtém êxito para acompanhar seu pedido. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Escolher o produto do Cárdapio <br> Adicionar  no carrinho de compras e finalizar o pedido, e ir para tela de status da compra.   |
|Critério de Êxito | - O cliente conseguiu acommpanhar o pedido. |
|  	|  	|

| **Caso de Teste** 	| **CT-08 – Cardápio **	|
|:---:	|:---:	|
|Requisito Associado | RF-08 - O sistema deve exibir informações detalhadas sobre cada produto, incluindo preço, descrição e imagem |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Logar com a conta Admin <br> selecionar a categoria desejada dos produtos do cardápio.   |
|Critério de Êxito | - O usuário conseguiu visualizar os produdos e sua demais informações cardápio. |
|  	|  	|

| **Caso de Teste** 	| **CT-09 – O sistema deve oferecer a opção de entrega em domicílio ou retirada na loja**	|
|:---:	|:---:	|
|Requisito Associado | RF-09 - O sistema deve oferecer a opção de entrega em domicílio ou retirada na loja. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Acessar o carinho <br> finalizar o pedido <br> escolher a forma de entrega.|
|Critério de Êxito | - O cliente conseguiu escolher a forma de entrega. |
|  	|  	|

| **Caso de Teste** 	| **CT-09 – tipo de entrega do pedido**	|
|:---:	|:---:	|
|Requisito Associado | RF-09 - O sistema deve oferecer a opção de entrega em domicílio ou retirada na loja. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Acessar o carinho <br> finalizar o pedido <br> escolher a forma de entrega.|
|Critério de Êxito | - O cliente conseguiu escolher a forma de entrega. |
|  	|  	|
