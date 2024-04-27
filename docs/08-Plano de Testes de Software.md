# Plano de Testes de Software

| **Caso de Teste** 	| **CT-01 – Cadastro e login usando credenciais.** 	|
|:---:	|:---:	|
|	Requisito Associado 	| RF-01 - Os usuários devem poder fazer cadastro e login usando suas credenciais. |
| Objetivo do Teste 	| Verificar se o usuário consegue se cadastrar e logar na aplicação. |
| Passos 	| - Acessar o serviço <br> - Clicar no icone do Perfil <br> - Preencher os campos obrigatórios (Nome, E-mail, Senha, Confirmação de Senha)  - Clicar em "Cadastra" <br> - Fechar a aplicação e realizar a iniciação dela novamente. <br> - Logar com seu usuário e senha cadastrados e verificar se o usuário foi logado.|
|Critério de Êxito | - O cadastro foi realizado com sucesso e salvo no sistema |

| **Caso de Teste** 	| **CT-02 – Cadastro e atualização de produtos**	|
|:---:	|:---:	|
|Requisito Associado | RF-02 - O sistema deve permitir que os gerentes cadastrem e atualizem informações de produtos, como descrições, preços e imagens. |
| Objetivo do Teste 	| Verificar se o usuário *GERENTE* consegue efetuar o cadastro e atualização dos produtos. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado)<br> - Clicar no botão "Entrar" <br> - Preencher os dados solicitados. <br> - Clicar em "Login" <br> - Clicar em "Alterar ou Cadastrar produto" |
|Critério de Êxito | - Os cadastros e alterações foram realizados com sucesso. |
|  	|  	|

| **Caso de Teste** 	| **CT-03 – Carrinho de compras e finalização**	|
|:---:	|:---:	|
|Requisito Associado | RF-03 - O sistema deve permitir que os clientes adicionem produtos a um carrinho de compras e RF-04 O sistema deve permitir que os clientes concluam a compra quando direcionado para a tela de resumo das compras.| 
| Objetivo do Teste 	| Verificar se o usuário *Cliente* obtém êxito ao adicionar um produto ao carrinho de compras e ao efetuar uma compra. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado)<br> - Clicar no botão "Entrar" <br> - Preencher os dados solicitados <br> - Clicar em "Login" <br> - Navegar até a página do produto desejado. <br> - Na página do produto, pressionar o botão "Adicionar ao carrinho 🛒 de compras ". <br> - Acessar o carrinho. <br> - Pressionar botão  "Confirmar" <br>   |
|Critério de Êxito | - O cliente conseguiu adicionar um produto ao seu carrinho de compras e finalizar na tela de resumo com a escolha do  metodo de pagamento. |
|  	|  	|

| **Caso de Teste** 	| **CT-04 – Navegação do Menu **	|
|:---:	|:---:	|
|Requisito Associado | RF-05 -O menu deverá permitir o usuário navegar entre as seguintes telas: home page, cardápio, carrinho de compra, histórico de pedidos, meu perfil |
| Objetivo do Teste 	| Verificar se o usuário *Cliente* obtém êxito ao navegar no menu. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Navegar no menu atráves dos botões.   |
|Critério de Êxito | - O cliente conseguiu navegar pelo menu. |
|  	|  	|

| **Caso de Teste** 	| **CT-05 – Iniciar pedido e cancelar **	|
|:---:	|:---:	|
|Requisito Associado | RF-06 - O sistema deve permitir iniciar o pedido ou cancelar no carriinho de compra. |
| Objetivo do Teste 	| Verificar se o usuário *Cliente* obtém êxito ao cancelar o pedido  no carinho de compra. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Escolher o produto do Cárdapio <br> Adicionar  no carrinho de compras e cancelar o pedido.   |
|Critério de Êxito | - O cliente conseguiu cancelar pedido. |
|  	|  	|

| **Caso de Teste** 	| **CT-06 – Excluir produto do carrinho **	|
|:---:	|:---:	|
|Requisito Associado | RF-07 -O sistema deve permitir excluir pedidos do carrinho	| Verificar se o usuário *Cliente* obtém êxito para excluir produto do carrinho. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Escolher o produto do Cárdapio <br> Adicionar  no carrinho de compras e clicar no icone "-" para retirar o produto do carrinho. |
|Critério de Êxito | - O cliente conseguiu excluir o produto. |
|  	|  	|

| **Caso de Teste** 	| **CT-07 – Status do pedido **	|
|:---:	|:---:	|
|Requisito Associado | RF-08 - O sistema deve permitir que os clientes acompanhem em tempo real o status de seus pedidos, desde o momento da realização até a entrega	| Verificar se o usuário *Cliente* obtém êxito para acompanhar seu pedido. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Escolher o produto do Cárdapio <br> Adicionar  no carrinho de compras e finalizar o pedido, e ir para tela de status da compra.   |
|Critério de Êxito | - O cliente conseguiu acommpanhar o pedido. |
|  	|  	|

| **Caso de Teste** 	| **CT-08 – Gerenciar cardápio **	|
|:---:	|:---:	|
|Requisito Associado | RF-09 - O sistema deve permitir que os gerentes gerenciem os estoques de produtos, incluindo a definição de quantidades mínimas e máximas	| Verificar se o usuário *Administrador* obtém êxito para editar o cardápio. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Logar com a conta Admin <br> Gerenciar o cardápio.   |
|Critério de Êxito | - O gerente conseguiu gerenciar o cardápio. |
|  	|  	|

| **Caso de Teste** 	| **CT-09 – Horário de funcionamento **	|
|:---:	|:---:	|
|Requisito Associado | RF-010 - O sistema deve permitir que os clientes visualizem o horário de funcionamento da cafeteria, com a possibilidade de programar pedidos com antecedência, de acordo com o horário de abertura e fechamento	| Verificar se o usuário *Cliente* obtém êxito para visualizar horário de funcionamento. |
| Passos 	| - Acessar o navegador <br> - Informar o endereço do site (link a ser disponibilizado) <br> Acessar tela Home Page <br> Verificar horário de funcionamento   |
|Critério de Êxito | - O cliente conseguiu ver o horário. |
|  	|  	|
