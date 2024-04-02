# Arquitetura da Solução

A Arquitetura da Solução é a disciplina que define a estrutura e o funcionamento de um sistema completo, abrangendo desde os componentes técnicos até os processos de negócio. Ela traduz as necessidades do cliente em uma solução viável, alinhando tecnologia, recursos e habilidades com os objetivos de negócio.

![WhatsApp Image 2024-04-01 at 20 54 54](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-pmv-ads-2024-1-e4-proj-infra-t5-grupo04-Dolce-Coffe/assets/93801572/d60f12f4-acd0-40f7-9b72-356687865b7e)


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![Diagrama de Classe](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-infra-t5-pmv-ads-2024-1-e4-proj-infra-t5-grupo04-Dolce-Coffe/assets/79721330/8a686a52-0899-466b-8261-96ce9e16bfa3)


## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

![modelo ER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-t4-time4-Dolce-Coffe/assets/111931438/def1ec57-549c-4b61-a9f5-835578a2dc14)


## Modelo Físico

Documentação do Modelo de Dados NoSQL

## 1. Introdução ao MongoDB

O MongoDB é um banco de dados NoSQL de código aberto, orientado a documentos, altamente escalável e flexível. Ele é adequado para uma ampla variedade de aplicativos, incluindo aqueles que exigem armazenamento de dados semiestruturados, como um site de cardápio online.

## 2. Justificativa da Escolha do MongoDB

O MongoDB foi escolhido para este projeto devido às suas vantagens específicas para o contexto da aplicaçao:

- **Flexibilidade de Esquema:** Como o cardápio pode incluir uma variedade de itens com diferentes campos e atributos, a flexibilidade de esquema do MongoDB permite modelar os dados de forma mais natural e eficiente.
  
- **Escalabilidade Horizontal:** À medida que o número de usuários e itens do cardápio aumenta, o MongoDB oferece a capacidade de escalar horizontalmente, distribuindo dados em vários servidores para lidar com cargas de trabalho crescentes.
  
- **Integração com Aplicativos Web:** O MongoDB é frequentemente utilizado em conjunto com aplicativos web devido à sua facilidade de integração com linguagens de programação populares e frameworks de desenvolvimento.

## 3. Avaliação do Modelo de Dados

Para este projeto, o modelo de dados no MongoDB será composto por várias coleções para armazenar informações relacionadas a usuários, itens do cardápio, pedidos e detalhes do carrinho de compras. A seguir está uma descrição geral do modelo de dados proposto:

- **Coleção de Usuários:** Armazenará informações como nome de usuário, senha (criptografada), endereço de e-mail e detalhes de contato.
  
- **Coleção de Itens do Cardápio:** Cada documento nesta coleção representará um item do cardápio e incluirá campos como nome do item, descrição, preço e categoria.
  
- **Coleção de Pedidos:** Cada pedido será representado por um documento nesta coleção, contendo informações como ID do usuário, itens pedidos e total do pedido.
  
- **Coleção de Carrinho de Compras:** Será utilizada para armazenar temporariamente os itens selecionados pelo usuário antes de confirmar o pedido.

A desnormalização será empregada para melhorar o desempenho das consultas, reduzindo a necessidade de realizar junções complexas entre diferentes coleções.

## 4. Comparação com Modelo Relacional

Em comparação com um modelo de banco de dados relacional, o modelo de dados NoSQL proposto oferece as seguintes vantagens:

- **Flexibilidade de Esquema:** No MongoDB, não há necessidade de definir um esquema rígido à frente do tempo, permitindo uma adaptação mais fácil a mudanças nos requisitos do aplicativo.
  
- **Escalabilidade Horizontal:** O MongoDB oferece melhor escalabilidade horizontal, permitindo que o sistema cresça mais facilmente com o aumento do número de usuários e itens do cardápio.
  
- **Desempenho Melhorado:** A desnormalização e a capacidade de armazenar documentos relacionados juntos no MongoDB podem resultar em consultas mais rápidas e eficientes, especialmente para operações de leitura de dados.

## 5. Considerações de Desempenho e Escalabilidade

O modelo de dados NoSQL proposto oferece várias vantagens em termos de desempenho e escalabilidade:

- **Consulta de Dados Eficiente:** O MongoDB suporta índices para otimizar a consulta de dados, permitindo pesquisas rápidas mesmo em grandes conjuntos de dados.
  
- **Inserção e Atualização de Dados Rápidas:** A estrutura de documentos do MongoDB simplifica a inserção e atualização de dados, sem a necessidade de transações complexas.
  
- **Distribuição de Carga em Clusters:** O MongoDB pode ser implantado em um cluster distribuído para distribuir a carga entre vários servidores, garantindo alta disponibilidade e desempenho.

## 6. Codigos de Criaçao de Collections para configuraçao do banco de dados

use cardapio_online_db  // Cria ou seleciona o banco de dados "cardapio_online_db"

// Criação da coleção de Usuários
db.createCollection("usuarios")

// Adiciona um índice único no campo "email" para garantir que cada usuário tenha um e-mail único
db.usuarios.createIndex({ "email": 1 }, { unique: true })

// Criação da coleção de Itens do Cardápio
db.createCollection("itens_cardapio")

// Criação de um índice composto no campo "categoria" e "nome" para facilitar as consultas por categoria e nome do item
db.itens_cardapio.createIndex({ "categoria": 1, "nome": 1 })

// Criação da coleção de Pedidos
db.createCollection("pedidos")

// Criação de um índice no campo "id_usuario" para facilitar a consulta de pedidos por usuário
db.pedidos.createIndex({ "id_usuario": 1 })

// Criação da coleção de Carrinho de Compras
db.createCollection("carrinho_compras")

// Criação de um índice no campo "id_usuario" para facilitar a consulta do carrinho de compras por usuário
db.carrinho_compras.createIndex({ "id_usuario": 1 })

## Tecnologias Utilizadas

### Ferramentas e Serviços

- [Visual Studio Code](https://code.visualstudio.com/) - Editor de código fonte.
- [Postman](https://taskit-pucminas.postman.co/) - Ferramenta para testar APIs REST.
- [Docker](https://www.docker.com/) - Plataforma para criação e execução de containers.
- [GitHub](https://github.com) - Plataforma de hospedagem de código fonte e controle de versão.

### API

- [Express JS](https://expressjs.com/pt-br/) - Criação da API
- [MOngoDB](https://www.mongodb.com/pt-br) - Banco de dados principal da aplicação.
- [Swagger UI](https://swagger.io) - Ferramenta para documentação de APIs REST.

### Web / App
- [Bootstrap](https://getbootstrap.com) - Framework para estrutura do CSS que permite criar aplicações web responsivas rápidas e seguras.
- [React](https://react.dev) - Framework para JavaScript que permite criar aplicações web rápidas e seguras.


## Hospedagem

A hospedagem será feita na plataforma [GitHub](https://github.com).



## Qualidade de Software

Escolhemos trabalhar contemplando as principais características de qualidade que podem ser atribuídas ao sistema. Entre elas:

Adequação funcional: O nosso sistema está focado em ser capaz de realizar as tarefas propostas e objetivos específicos.

Confiabilidade (Tolerância a falhas): Um sistema que seja capaz de operar diante de falhas.
    -Maturidade: Capacidade de atingir as necessidade de confiabilidade.

Compatibilidade (Interoperabilidade): Uma das subcaracterísticas chave do nosso projeto, pois trata-se da possibilidade de dois ou mais sistemas trocarem informações.

Portabilidade: Um ponto extremamente importante, no qual é necessário que nosso sistema consiga ser funcional em um novo hardware, software e outros ambientes.

