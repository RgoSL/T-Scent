{/* Classe de Configuração da Conexão com o BD */}

import mysql from "mysql2/promise"; {/* Módulo Interno do Node Para Aceitar MySQL */}
import dotenv from "dotenv"; {/* Import .Env com as Váriaveis de Configuração do BD */}

dotenv.config(); {/* Chamada das Váriaveis do .Env */}

{/* Criação de uma Pool Para Reutilizar Conexões com o BD */}
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default pool;