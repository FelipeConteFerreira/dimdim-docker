# 🚀 Projeto DimDim - Docker (Checkpoint 2)

## 📌 Descrição

Este projeto tem como objetivo demonstrar a utilização de containers Docker para execução de uma aplicação Node.js integrada a um banco de dados MySQL.

A aplicação implementa um CRUD completo (Create, Read, Update e Delete) de usuários, permitindo testar a comunicação entre containers em uma rede Docker.

---

## 🛠️ Tecnologias utilizadas

* Node.js
* Express
* MySQL
* Docker
* WSL (Ubuntu)
* Postman

---

## 🧱 Arquitetura

O sistema é composto por dois containers:

* 📦 Container 1: API (Node.js)
* 💾 Container 2: Banco de Dados (MySQL)

Os containers estão conectados através de uma rede Docker personalizada e utilizam um volume nomeado para persistência dos dados.

---

## ⚙️ Como executar o projeto

### 1. Criar rede Docker

```bash
docker network create dimdim-rede
```

### 2. Criar volume

```bash
docker volume create dimdim-volume
```

### 3. Subir container do MySQL

```bash
docker run -d --name mysql-RM562248 --network dimdim-rede -v dimdim-volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=dimdim -p 3306:3306 mysql:8
```

### 4. Build da API

```bash
docker build -t dimdim-api .
```

### 5. Subir container da API

```bash
docker run -d --name api-RM562248 --network dimdim-rede -p 3000:3000 -e DB_HOST=mysql-RM562248 dimdim-api
```

---

## 🌐 Acessando a aplicação

A API estará disponível em:

```
http://localhost:3000
```

---

## 🧪 Testando o CRUD

### ➤ Criar usuário (POST)

```
POST http://localhost:3000/usuarios
```

```json
{
  "nome": "Felipe",
  "email": "felipe@email.com"
}
```

---

### ➤ Listar usuários (GET)

```
GET http://localhost:3000/usuarios
```

---

### ➤ Atualizar usuário (PUT)

```
PUT http://localhost:3000/usuarios/1
```

```json
{
  "nome": "Felipe atualizado",
  "email": "novo@email.com"
}
```

---

### ➤ Deletar usuário (DELETE)

```
DELETE http://localhost:3000/usuarios/1
```

---

## 💾 Acessando o banco de dados

```bash
docker exec -it mysql-RM562248 mysql -u root -p
```

Senha:

```
1234
```

Comandos SQL:

```sql
USE dimdim;
SELECT * FROM usuarios;
```

---

## 📸 Evidências necessárias

Executar e capturar prints dos comandos:

```bash
docker ps
docker image ls
docker volume ls
docker network ls
```

---

## 🔗 Link do video 

* Vídeo: https://youtu.be/Kf4aCuVjkgU

---

## 🏁 Conclusão

O projeto demonstra a utilização do Docker para containerização de aplicações, garantindo isolamento, portabilidade e facilidade de execução. Foi possível validar a comunicação entre containers e a persistência de dados com volumes.

---

## 👨‍💻 Autores

Felipe Conte – RM 562248
Altamir Lima - RM 562906

