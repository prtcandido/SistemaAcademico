# Grupo 5 - Planejamento de Aulas

## Integrantes do grupo:

- Carlos Felipe Duaibs

- Isabella Aguiar

- Thais Yassue

#### 1 - Como rodar

##### Na raiz do projeto:

- Duplique o arquivo .env.example e renomeie a cópia para .env apenas

- Installe a dependências rodando o comando no terminal:

  > npm i

- Rode as migrations rodando o comando:

  > npx prisma migrate dev

  Obs.: se atente para que o banco criado via Xampp tenha o mesmo nome/configs que constam no arquivo **.env**. Caso prefira usar docker, foi criado um arquivo docker-compose com o banco mysql configurado, sendo necessário apenas rodar o comando:

  > docker-compose up

  na raiz do projeto em uma nova instância do terminal, contanto que tenha o docker instalado.

- Popule o banco com as entidades de exemplo usando o arquivo de seed utilizando o comando:

  > npm run seed

- Importe a collection no Postman utilizando o arquivo **SistemaAcademico.postman_collection.json** que se encontra na raiz do projeto.

- Inicialize o servidor utilizando o comando:

  > npm run dev

##### 2 - Rotas:

O projeto conta com um crud para Aulas, além de uma rota em /turmas/ para gerar o pdf do planejamento de todas as Aulas da Turma passada via id.
