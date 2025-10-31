<p align="center">
  <img src="EstoqueWeb/meubenzinholinda.png" width="100" alt="Logo do Sistema"/><br/>
  <h1 align="center">📦 Sistema de Estoque — ASP.NET + SQLite + Web + CLI</h1>
  <p align="center">
    Um sistema de <b>controle de estoque</b> desenvolvido com <b>C# (.NET 9)</b>, 
    <b>Entity Framework Core</b>, <b>API REST</b> e um frontend moderno em <b>HTML, CSS e JavaScript</b>.
  </p>
</p>

---

## ✨ Funcionalidades

- 🌐 **API REST** com CRUD completo (GET, POST, PUT, DELETE)  
- 💾 **Banco de dados SQLite** com Migrations via Entity Framework Core  
- 🧠 **Validações automáticas** com DataAnnotations  
- 💻 **Interface Web moderna e responsiva** (HTML + JS + CSS)  
- 🖥️ **Aplicativo CLI (linha de comando)** para uso rápido no terminal  
- 📘 **Documentação completa** com guia passo a passo  

---

## 🧩 Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-------------|
| **Backend** | ASP.NET Core Web API (.NET 9) |
| **Banco de Dados** | SQLite + Entity Framework Core 9 |
| **ORM** | EF Core + Migrations |
| **Frontend** | HTML5, CSS3, JavaScript (Fetch API) |
| **CLI** | Aplicativo Console em C# |
| **Testes** | Swagger / Postman |

---

## 🏗️ Estrutura do Projeto

```📦 EstoqueApi (Solução)
├── EstoqueApi/ # Projeto da API REST
│ ├── Controllers/ # Controladores da API
│ │ └── ProductsController.cs
│ ├── Data/ # Contexto do banco (EF Core)
│ │ └── AppDbContext.cs
│ ├── Models/ # Modelos de dados
│ │ └── Product.cs
│ ├── Program.cs # Configuração principal
│ ├── appsettings.json # Configurações da API
│ ├── EstoqueApi.http # Testes via Visual Studio
│ └── estoque.db # Banco SQLite (gerado automaticamente)
│
├── EstoqueCli/ # Aplicativo de Linha de Comando
│ └── Program.cs
│
└── EstoqueWeb/ # Interface Web
├── index.html # Página principal
├── style.css # Estilos (tema laranja)
├── script.js # Lógica e integração com a API
└── meubenzinholinda.png # Ícone da aplicação
```
---


---

## ⚙️ Pré-requisitos

Antes de começar, instale:

- 🧱 [Visual Studio 2022](https://visualstudio.microsoft.com/)  
  (com suporte a **.NET 9 SDK** e **ASP.NET Core**)
- 💾 [SQLite](https://www.sqlite.org/download.html) *(opcional – EF Core cria o banco automaticamente)*
- 🌍 Navegador moderno (Chrome, Edge, Firefox)

---

## 🚀 Como Rodar o Projeto

### 🧩 1️⃣ Clonar o repositório

```bash
git clone https://github.com/SEU_USUARIO/EstoqueApi.git
cd EstoqueApi
```
### ⚙️ 2️⃣ Restaurar dependências

```bash
dotnet restore
```
### 🧱 3️⃣ Criar o banco de dados (Migrations)

```bash
Na pasta EstoqueApi:

dotnet ef migrations add InitialCreate
dotnet ef database update

💡 Isso criará automaticamente o arquivo estoque.db.
```
### ▶️ 4️⃣ Executar a API

```bash
Na pasta EstoqueApi:

dotnet run

A API ficará disponível em:

https://localhost:7183
http://localhost:5137


Acesse o Swagger para testar:

👉 https://localhost:7183/swagger
```
### 🌐 5️⃣ Executar o Frontend (Interface Web)

```bash
Vá até a pasta EstoqueWeb

Abra o arquivo index.html

Se estiver usando VS Code, use Open with Live Server

Ou abra direto no navegador (file:///C:/.../index.html)

⚠️ A API precisa estar rodando antes de abrir o site.
```
### 🖥️ 6️⃣ Executar o CLI
```bash
Na pasta EstoqueCli, execute:

dotnet run


📋 O menu exibirá:

=== CLI Estoque ===
1 - Listar produtos
2 - Adicionar produto
3 - Atualizar produto
4 - Remover produto
```

## 🧠 Endpoints da API

| Método | Endpoint | Descrição |
|:-------:|:----------|:-----------|
| 🟢 **GET** | `/api/products` | Lista todos os produtos |
| 🟢 **GET** | `/api/products/{id}` | Retorna um produto específico |
| 🟡 **POST** | `/api/products` | Cria um novo produto |
| 🟠 **PUT** | `/api/products/{id}` | Atualiza um produto existente |
| 🔴 **DELETE** | `/api/products/{id}` | Exclui um produto |

### 🎨 Funcionalidades do Frontend
```bash
✅ CRUD completo (Adicionar, Editar, Excluir, Atualizar)
✅ Máscara automática para moeda (R$ 0.000,00)
✅ Categorias com menu suspenso
✅ Nome e categoria em MAIÚSCULO automaticamente
✅ Layout moderno com tema laranja
✅ Rodapé fixo e ícone personalizado
```

## 🧰 Solução de Problemas

| ⚠️ **Erro** | 💡 **Causa** | 🧩 **Solução** |
|--------------|--------------|----------------|
| `Microsoft.EntityFrameworkCore not found` | EF Core não instalado | Execute `dotnet add package Microsoft.EntityFrameworkCore.Sqlite` |
| `Network-related error` | API não está rodando | Rode `dotnet run` na pasta `EstoqueApi` |
| `CORS policy error` | API bloqueando requisições externas | Adicione `builder.Services.AddCors()` no `Program.cs` |

###👨‍💻 Autor
```bash
Desenvolvido por [Guizzin]
💻 Projeto acadêmico — CRUD completo com C#, EF Core, SQLite e Frontend Web.
```
### 🪪 Licença
```bash
Este projeto é de uso acadêmico e educacional.
Sinta-se à vontade para clonar, estudar e aprimorar! 🚀
```
https://youtu.be/DS28TTgsFsE
