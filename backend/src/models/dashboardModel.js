  {/* */}

    {/* */}
import pool from "../config/db.js";

  {/* */}
export const getRegiaoMetrics = async (regiaoId) => {
  try {
    const [rows] = await pool.query(
      `
            SELECT 
                (SELECT COUNT(ID_Vendedor) FROM vendedor WHERE ID_Regiao = ?) AS qtnVen,
                (SELECT COUNT(ID_Cliente) FROM cliente WHERE ID_Regiao = ?) AS qtnCli,
                (SELECT COUNT(ID_Veiculo) FROM veiculo WHERE ID_Regiao = ?) AS qtnVeiculo,
                r.Nome_Regiao
            FROM regiao r
            WHERE r.ID_Regiao = ?
            LIMIT 1
            `,
      [regiaoId, regiaoId, regiaoId, regiaoId]
    );
    return rows[0];
  } catch (error) {
    throw new Error("Falha ao buscar métricas da região.");
  }
};

  {/* */}
export const getPontosEstrategicos = async (regiaoId) => {
  try {
    const [rows] = await pool.query(
      "SELECT Desc_Ponto FROM pontos_estrategicos WHERE ID_Regiao = ?",
      [regiaoId]
    );

    return rows.map((row) => row.Desc_Ponto);
  } catch (error) {
    console.error("Erro ao buscar Pontos Estratégicos:", error);
    throw new Error("Falha ao buscar pontos estratégicos.");
  }
};