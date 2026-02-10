# ProductFlow - Guia de Instalação e Uso

## 1. PREPARAR O BANCO DE DADOS

Abra seu MySQL e execute o arquivo `setup.sql`:

```sql
CREATE DATABASE web_03mb;
USE web_03mb;

CREATE TABLE produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(255),
  preco DECIMAL(10,2),
  categoria VARCHAR(255),
  descricao TEXT
);
```

## 2. CONFIGURAR VARIÁVEIS DE AMBIENTE

- Copie `.env.example` para `.env`
- Ajuste as credenciais do banco se necessário:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=web_03mb
PORT=3000
```

## 3. INSTALAR DEPENDÊNCIAS

```bash
npm install
```

## 4. INICIAR O SERVIDOR

**Desenvolvimento (com nodemon):**
```bash
npm run dev
```

**Produção:**
```bash
npm start
```

## 5. ACESSAR O PROJETO

- Abra `http://localhost:3000` no navegador
- Navegue entre as páginas usando a navbar
- Cadastre produtos e visualize-os na listagem

## ESTRUTURA DO PROJETO

```
├── server.js              # Servidor Express
├── db.js                  # Configuração MySQL
├── routes/
│   └── produtos.js        # Rotas da API
├── package.json           # Dependências
├── .env.example          # Variáveis de ambiente
├── .gitignore            # Arquivos ignorados
├── setup.sql             # Script do banco
└── public/
    ├── index.html        # Página inicial
    ├── cadastrar.html    # Formulário de cadastro
    ├── produtos.html     # Listagem de produtos
    ├── css/
    │   └── style.css     # Estilos (glassmorphism)
    └── js/
        └── script.js     # JavaScript (fetch API)
```

## ENDPOINTS DA API

- `GET /produtos` - Lista todos os produtos
- `POST /produtos` - Cria um novo produto

### Exemplo POST:
```json
{
  "nome": "Smartphone XYZ",
  "preco": 1299.99,
  "categoria": "Eletrônicos",
  "descricao": "Descrição detalhada do produto..."
}
```

## CARACTERÍSTICAS

✅ Design responsivo com glassmorphism
✅ Navbar fixa e navegação intuitiva
✅ Formulário de cadastro com validação
✅ Listagem dinâmica de produtos
✅ API RESTful em Express
✅ Banco de dados MySQL
✅ CORS habilitado
✅ Scripts npm (start e dev)
✅ .gitignore configurado

---

**Desenvolvido com Node.js, Express, MySQL, HTML, CSS e JavaScript puro.**
