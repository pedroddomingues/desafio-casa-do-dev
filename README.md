# Documentação - Desafio Casa do Dev

Esta é a minha implementação do desafio proposto pela Casa do Dev na edição NodeJS. Resolvi fazer o desafio para aprender e exercitar meus conhecimentos, por isso escolhi tecnologias que nunca tinha usado até então. Elas são:

# Techs

- **Nestjs -** Um framework em node que  roda com o TypeScript no express por baixo dos panos.
- **Mongodb -** Um banco de dados NoSQL baseado em documentos.

## Como rodar

Para rodar o servidor, primeiro é necessário que você **tenha o node instalado**.

Depois, clone o código fonte para seu ambiente e entre na pasta

```bash
git clone https://github.com/pedroddomingues/desafio-casa-do-dev
cd desafio-casa-do-dev
```

Instale as dependências

```bash
yarn
#ou
npm install
```

Como o servidor usa o **mongodb** será necessário informar as credenciais. Renomeie o arquivo `.env.example` para `.env` e de acordo com o arquivo coloque as credenciais e o segredo do token JWT.

Agora inicie o servidor

```bash
yarn start
#ou
npm run start
```

### Rotas

As rotas estão definidas no arquivo para ser importado no insomnia e também existe a documentação no caminho "/api"

## TODO

- Padronizar a saída dos erros, exceções, etc.
- Melhorar a documentação do swagger.
    - Criar interfaces específicas para o swagger e separar das classes usadas no sistema e/ou db.
- Implementar testes.
- Confirmação de criação de conta por email.
- Recuperar senha.
- Fazer login com o número sequencial da conta.
- Talvez criar um campo na conta com o limite disponível que seria calculado automaticamente a cada transação.

## Minha linha de implementação

- **Separar as entidades de usuário de conta bancária:** mesmo que por enquanto cada usuário possa ter apenas uma conta bancária, se no futuro for possível que um usuário tenha mais de uma será muito mais fácil de implementar. (A criação da conta é feita automaticamente na rota de criação de usuário mas a lógica é totalmente desacoplada)
- **Toda transação tem valor positivo:** o que define se a transação subtrai ou adiciona valor à conta bancário é o seu tipo. No caso específico da transferência, onde ela ao mesmo tempo adiciona e subtrai, o saldo é calculado de acordo com o sentido a transferência.
- **Validação dos campos:** resolvi utilizar as ferramentas já prontas da comunidade, por meio do class-validator do próprio Nestjs, verificando os campos. Mas ainda assim aprendi como validar um CPF.
- **Número sequencial da conta:** como o mongodb gera automaticamente uma string única como _id para cada documento, depois de pesquisar bastante, resolvi fazer uma collection que salva ids sequenciais e passo esse valor para a conta.
- **Autenticação:** para autenticação utilizei os módulos do Nestjs com Passport, mas devido às minhas escolhas de rotas (todas as transações são feitas no mesmo endereço) precisei criar Guards customizados.
- **Hash da senha:** a senha foi salva com hash para garantir mais segurança.
- **Separação de responsabilidades:** mesmo separando as entidades de usuário e conta bancária, garanti que cada módulo do Nestjs tenha acesso apenas à uma collection do mongodb.

## O que eu aprendi

Nos meus últimos projetos tenho feito essa seção onde escrevo o que aprendi.

- Como usar o Nestjs.
- A estrutura do Nestjs com controllers, serviços e módulos para cada entidade.
- O que é o mongodb.
- Como usar o mongodb através da sintaxe do mongoose.
- Injeção de dependências.
- Decorators.
- Dependências circulares.
