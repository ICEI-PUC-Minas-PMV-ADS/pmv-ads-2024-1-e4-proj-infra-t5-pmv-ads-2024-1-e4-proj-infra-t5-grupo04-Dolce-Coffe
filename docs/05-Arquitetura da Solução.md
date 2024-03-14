# Arquitetura da Solução

A Arquitetura da Solução é a disciplina que define a estrutura e o funcionamento de um sistema completo, abrangendo desde os componentes técnicos até os processos de negócio. Ela traduz as necessidades do cliente em uma solução viável, alinhando tecnologia, recursos e habilidades com os objetivos de negócio.

![WhatsApp Image 2024-02-24 at 12 40 42](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-t4-time4-Dolce-Coffe/assets/93801572/e4b8fd11-5343-4f64-9196-5c702d06e663)


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![Diagrama de Classe](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-t4-time4-Dolce-Coffe/assets/111931438/94ea52ef-2f84-4469-bdfd-1523deea5157)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

![modelo ER](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e4-proj-dist-t4-time4-Dolce-Coffe/assets/111931438/def1ec57-549c-4b61-a9f5-835578a2dc14)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

### Ferramentas e Serviços

- [Visual Studio Code](https://code.visualstudio.com/) - Editor de código fonte.
- [Postman](https://taskit-pucminas.postman.co/) - Ferramenta para testar APIs REST.
- [Docker](https://www.docker.com/) - Plataforma para criação e execução de containers.
- [GitHub](https://github.com) - Plataforma de hospedagem de código fonte e controle de versão.
- [GitHub Actions](https://github.com/actions) - Ferramenta de integração contínua do GitHub.
- [Vercel](https://vercel.com/) - Plataforma de hospedagem de aplicações web serverless e bancos de dados.

### API

- [Node.js](https://nodejs.dev) - Ambiente de execução Javascript server-side.
- [Typescript](https://typescriptlang.org) - Superset do Javascript que adiciona tipagem estática e outros recursos.
- [Next.js 13](https://nextjs.org) - Framework para React.js que conta com um backend embutido, podendo ser utilizado também como uma API.
- [Prisma](https://prisma.io) - ORM para Node.js compatível com Typescript, que facilita a interação com o banco de dados.
- [MOngoDB](https://www.mongodb.com/pt-br) - Banco de dados principal da aplicação.
- [Swagger UI](https://swagger.io) - Ferramenta para documentação de APIs REST.

### Web

- [React.js](https://reactjs.dev) - Biblioteca para criação de interfaces de usuário.
- [Next.js 13](https://nextjs.org) - Framework para React.js que permite criar aplicações web rápidas e seguras.
- [NativeWind](https://nativewind.dev) - Framework CSS que permite criar interfaces de usuário de forma rápida e consistente.

### App

- [React Native](https://reactnative.dev) - Biblioteca para criação de interfaces de usuário.
- [Tailwind CSS](https://tailwindcss.com) - Framework CSS que permite criar interfaces de usuário de forma rápida e consistente.

> Uma relação completa das tecnologias utilizadas pode ser encontrada no arquivo [package.json](../src/web/package.json) dentro do diretório do projeto.

## Hospedagem

A hospedagem foi feita na plataforma [Vercel](https://vercel.com/) utilizando o GitHub Actions para fazer build e deploy da aplicação. Para isso, foi necessário criar um access token na Vercel, permitindo que o comando de deploy fosse utilizado na pipeline.

Caso a build seja um sucesso, e não haja falhas nos testes unitários, o deploy ocorre automáticamente quando um pull request é concluído para a branch main, ou quando um commit é feito diretamente nela.

## Qualidade de Software

Escolhemos trabalhar contemplando as principais características de qualidade que podem ser atribuídas ao sistema. Entre elas:

Adequação funcional: O nosso sistema está focado em ser capaz de realizar as tarefas propostas e objetivos específicos.

Confiabilidade (Tolerância a falhas): Um sistema que seja capaz de operar diante de falhas.
    -Maturidade: Capacidade de atingir as necessidade de confiabilidade.

Compatibilidade (Interoperabilidade): Uma das subcaracterísticas chave do nosso projeto, pois trata-se da possibilidade de dois ou mais sistemas trocarem informações.

Portabilidade: Um ponto extremamente importante, no qual é necessário que nosso sistema consiga ser funcional em um novo hardware, software e outros ambientes.

