  {/* */}

    {/* */}
import pool from "../config/db.js";

  {/* */}
export const getClientesByRegiao = async (regiaoId) => {
  try {
    const [rows] = await pool.query(
      `
            SELECT 
            ID_Cliente, 
            Nome, 
            Endereco AS endereco_db,
            Email 
            FROM cliente 
            WHERE ID_Regiao = ?
            `,
      [regiaoId]
    );

    return rows;
  } catch (error) {
    console.error("Erro no Model ao buscar clientes por região:", error);
    throw new Error("Falha ao buscar clientes no banco de dados.");
  }
};