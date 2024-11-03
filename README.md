
# Adoção Digital - Sistema de Adoção de Pets

## Descrição

**Adoção Digital** é um sistema de adoção de pets desenvolvido como parte do curso de Desenvolvimento Full Stack oferecido pela Atlântico. O principal objetivo deste projeto é modernizar e agilizar o processo de adoção de animais em abrigos, permitindo um gerenciamento eficiente de pets e adotantes através de uma aplicação web intuitiva.

## Problema

Abrigos de animais frequentemente enfrentam desafios relacionados à gestão manual de informações, o que resulta em atrasos e desorganização. A proposta da aplicação web é facilitar o cadastro de pets disponíveis para adoção e otimizar a conexão com potenciais adotantes, tornando o processo mais acessível e eficiente.

## Objetivo

Desenvolver uma aplicação web funcional que permita aos abrigos gerenciar seus pets e acompanhar o processo de adoção. A aplicação deve incluir funcionalidades para o cadastro e visualização de pets, registro de adotantes e formalização de adoções.

## Funcionalidades do Sistema

1. **Cadastro de Pets**
   - **Nome do pet**: Nome que o pet receberá no abrigo.
   - **Espécie**: Tipo de animal (cachorro, gato, coelho, etc.).
   - **Data de nascimento**: Data de nascimento aproximada do pet.
   - **Descrição**: Texto que descreve a personalidade e possíveis necessidades especiais do pet.
   - **Status**: Indica se o pet está "disponível" para adoção ou "adotado".
   - **Personalidade**: Informações adicionais sobre o temperamento do pet.
   - **Fotos do pet**: Imagens para melhor visualização dos pets disponíveis.

2. **Gerenciamento de Adotantes**
   - **Nome completo**: Nome do adotante.
   - **E-mail**: Para contato e notificações.
   - **Telefone**: Para contato direto.
   - **Endereço**: Local de residência do adotante.

3. **Processo de Adoção**
   - **Escolha do pet**: O adotante pode selecionar o pet desejado.
   - **Registro da data de adoção**: Data em que a adoção é formalizada.
   - **Atualização automática do status do pet**: O status do pet é alterado para "adotado" automaticamente.

4. **Visualização de Pets Disponíveis**
   - **Lista de pets**: Exibição das informações como nome, espécie, idade e descrição.
   - **Filtros**: Opções de filtro por espécie, idade ou status para facilitar a busca.

## Requisitos Técnicos

### Backend
- **Node.js**: Usado em conjunto com **Express** para a criação de rotas e gerenciamento de requisições.
- **Prisma ORM**: Facilita as operações no banco de dados.
- Implementação de operações CRUD (Create, Read, Update, Delete) para gerenciar informações de pets e adotantes.

### Banco de Dados
- Uso de **PostgreSQL** para armazenar informações de pets, adotantes e adoções.

### Docker
- Utilização do Docker para a containerização do PostgreSQL.

### Estrutura Básica do Banco
- **Pets**: Tabela que armazena informações dos pets (id, nome, espécie, data de nascimento, descrição, status, fotos).
- **Adotantes**: Tabela que armazena informações dos adotantes (id, nome, email, telefone, endereço).
- **Adoções**: Tabela que registra as adoções realizadas (id, pet_id, adotante_id, data_adocao).

### Frontend
- **ReactJS**: Utilizado para criar uma interface amigável e dinâmica para os usuários.

## Tecnologias Utilizadas

- **Backend**:
  - `Node.js`
  - `Express`
  - `Prisma`
  - `PostgreSQL`
  - `bcrypt`: Para segurança das senhas.
  - `jsonwebtoken`: Para autenticação de usuários.
  - `dotenv`: Para gerenciamento de variáveis de ambiente.
  - `zod`: Para validação de dados.

- **DevDependencies**:
  - `nodemon`: Para reinicialização automática do servidor.
  - `typescript` e `tsx`: Para suporte a TypeScript.

## Instruções para Execução

1. **Clone o repositório**:
   ```bash
   git clone <https://github.com/seu-usuario/AdocaoDigital.git>
   cd AdocaoDigital/Backend

```

1. **Instale as dependências**:
    
    ```bash
    npm install
    
    ```
    
2. **Configure o ambiente**:
    - Crie um arquivo `.env` na raiz do projeto e configure a URL do banco de dados:
    
    ```
    DATABASE_URL="postgresql://usuario:senha@localhost:5432/db_adocaoDigital"
    
    ```
    
3. **Execute as migrações do banco de dados**:
    
    ```bash
    npx prisma migrate dev
    
    ```
    
4. **Inicie o servidor**:
    
    ```bash
    npm run dev
    
    ```
    
5. **Acesse a aplicação**:
    - A API estará disponível em `http://localhost:3000` (ou a porta que você configurou).

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para fazer um fork do projeto, adicionar melhorias e enviar pull requests.