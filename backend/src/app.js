{/* Classe de Criação do Servidor Backend */}

import express from "express"; {/* Import do Framework Utilizado Para Configurar o Servidor */}

import cors from "cors"; {/* Pacote de Dados Para Ligar Backend e Frontend */}

{/* Import das Funcionalidades do Backend */}
import vendedorRoutes from "./routes/vendedorRoutes.js"; {/* Import da Feat de Gestão dos Perfis Cadastrados */}

import authRoutes from "./routes/authRoutes.js"; {/* Import da Feat de Autenticação de Perfis */}

import clienteRoutes from "./routes/clienteRoutes.js"; {/* Import da Feat de Gestão dos Dados de Clientes */}

import produtoRoutes from "./routes/produtoRoutes.js"; {/* Import da Feat de Gestão dos Dados de Produtos */}

import dashboardRoutes from "./routes/dashboardRoutes.js"; {/* Import da Feat que Exibe as Informações no Dashboard */}

import vendaRoutes from "./routes/vendaRoutes.js"; {/* Import da Feat de Controle das Vendas Geradas */}

import veiculoRoutes from "./routes/veiculosRoutes.js"; {/*Import da Feat de Controle dos Dados da Frota da Perfumaria */}

{/* Instânciando o Servidor */}
const app = express(); 

app.use(cors()); {/* Cria um Middleware Para Permitir que o Servidor Aceite Requisições */}
app.use(express.json()); 

{/* Definindo o que Cada Rota vai Requisitar */}
app.use("/vendedores", vendedorRoutes);
app.use("/veiculo", veiculoRoutes);
app.use("/auth", authRoutes);
app.use("/clientes", clienteRoutes); 
app.use("/produtos", produtoRoutes); 
app.use("/dashboard", dashboardRoutes);
app.use("/vendas", vendaRoutes);

export default app;