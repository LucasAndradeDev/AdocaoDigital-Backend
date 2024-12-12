# 🐾 Adoção Digital - Sistema de Adoção de Pets

## 📖 Descrição

**Adoção Digital** é um sistema de adoção de pets criado como parte do curso de Desenvolvimento Full Stack oferecido pela Atlântico. O objetivo principal deste projeto é modernizar e agilizar o processo de adoção de animais em abrigos, conectando pets e adotantes de forma mais rápida e eficiente através de uma aplicação web intuitiva e fácil de usar. 🐶🐱

## 🚨 Problema

Abrigos de animais frequentemente enfrentam dificuldades na gestão manual de dados, o que pode gerar atrasos e desorganização. A **Adoção Digital** resolve isso, permitindo que os abrigos gerenciem seus pets e conectem com adotantes de maneira simples e ágil! 🌟

## 🎯 Objetivo

Criar uma aplicação web para facilitar o cadastro e a adoção de animais em abrigos. A plataforma vai oferecer funcionalidades para registrar pets, acompanhar a adoção e conectar adotantes com seus futuros companheiros peludos! 🐕🐈

## 💡 Funcionalidades do Sistema

1. **Cadastro de Pets** 🐾
   - **Nome do pet**: O nome carinhoso que o pet ganha no abrigo.
   - **Espécie**: Tipo do pet (cachorro, gato, coelho, etc.).
   - **Data de nascimento**: Estimativa da data de nascimento.
   - **Descrição**: Características e necessidades especiais.
   - **Status**: Indica se o pet está "disponível" ou "adotado".
   - **Personalidade**: Detalhes sobre o temperamento do pet.
   - **Fotos do pet**: Imagens fofas para ajudar na escolha! 📸

2. **Gerenciamento de Adotantes** 💌
   - **Nome completo**: Nome do adotante interessado em dar um lar.
   - **E-mail**: Para contato e notificações.
   - **Telefone**: Para conversa direta.
   - **Endereço**: Local de residência do adotante.

3. **Processo de Adoção** 📝
   - **Escolha do pet**: O adotante escolhe o pet de sua preferência.
   - **Registro da data de adoção**: Quando a adoção é confirmada.
   - **Atualização automática do status do pet**: O status do pet muda para "adotado" após a finalização da adoção. 🎉

4. **Visualização de Pets Disponíveis** 🐾
   - **Lista de pets**: Exibição com informações de nome, espécie, idade e descrição.
   - **Filtros**: Filtros para facilitar a busca por espécie, idade ou status.

## 🔧 Requisitos Técnicos

### Backend
- **Node.js**: Usado com **Express** para construção da API e gerenciamento das rotas.
- **Prisma ORM**: Interage com o banco de dados de forma eficiente e segura.
- Implementação de CRUD (Create, Read, Update, Delete) para gerenciar pets e adotantes.

### Banco de Dados
- **PostgreSQL**: Para armazenar informações dos pets, adotantes e adoções. 🗃️

### Docker
- **Docker**: Containeriza o banco de dados PostgreSQL para facilitar o ambiente de desenvolvimento e produção. 🐳

### Estrutura Básica do Banco
- **Pets**: Tabela para armazenar dados dos pets (id, nome, espécie, data de nascimento, descrição, status, fotos).
- **Adotantes**: Tabela com informações sobre os adotantes (id, nome, email, telefone, endereço).
- **Adoções**: Tabela que registra as adoções (id, pet_id, adotante_id, data_adocao).

### Frontend
- **ReactJS**: Para uma interface amigável e interativa para os usuários. 🌐

## 🚀 Tecnologias Utilizadas

- **Prisma ORM**: Facilita a interação com o banco de dados PostgreSQL, com migrations e modelos de dados bem estruturados.
- **Express**: Framework para construção de APIs com Node.js.
- **TypeScript**: Para código mais seguro e fácil de manter. 💻
- **Zod**: Biblioteca para validação de dados e garantir que tudo seja seguro e correto.
- **bcrypt**: Para criptografar senhas de forma segura. 🔐
- **jsonwebtoken**: Geração e verificação de tokens JWT para autenticação e autorização.
- **dotenv**: Para gerenciar variáveis de ambiente de forma segura.
- **CORS**: Para permitir a comunicação entre frontend e backend com segurança.
- **UUID**: Para gerar identificadores únicos universais.
- **Docker**: Usado para containerizar o banco de dados PostgreSQL, tornando tudo mais consistente. 🐳

---

- **DevDependencies**:
  - `nodemon`: Para reiniciar o servidor automaticamente durante o desenvolvimento.
  - `typescript` e `tsx`: Suporte a TypeScript, proporcionando uma experiência de codificação mais robusta.

## 📋 Instruções para Execução

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
