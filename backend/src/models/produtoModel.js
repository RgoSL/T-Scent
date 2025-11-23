  {/* */}

    {/* */}
import pool from "../config/db.js";

  {/* */}
export const createProduto = async (nome, preco, qtdEstoque, marca) => {

    {/* */}
  const result = await pool.query(
    "INSERT INTO produto (Nome, Preco, Qtd_Estoque, Marca) VALUES (?, ?, ?, ?)",
    [nome, preco, qtdEstoque, marca]
  );
  return result[0].insertId; 
};

  {/* */}
export const getProdutoById = async (id) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        ID_Produto,
        Nome,
        Preco,
        Qtd_Estoque,
        Marca
      FROM produto
      WHERE ID_Produto = ?`,
      [id]
    );

    if (rows.length === 0) return null;

    return rows[0];
  } catch (error) {
    console.error("Erro no Modelo de Produtos:", error);
    throw new Error("Falha ao buscar produto no banco de dados.");
  }
};

  {/* */}
export const getAllProdutos = async () => {
  try {
    const [rows] = await pool.query(`
            SELECT 
                ID_Produto,
                Nome,
                Preco,
                Qtd_Estoque AS Estoque, 
                Marca
            FROM produto
            ORDER BY Nome
        `);
    return rows;
  } catch (error) {
    console.error("Erro no Model ao buscar produtos:", error);
    throw new Error("Falha ao buscar produtos no banco de dados.");
  }
};

  {/* */}
export const updateProduto = async (id, nome, preco, qtdEstoque, marca) => {
  const result = await pool.query(
    "UPDATE produto SET Nome = ?, Preco = ?, Qtd_Estoque = ?, Marca = ? WHERE ID_Produto = ?",
    [nome, preco, qtdEstoque, marca, id]
  );
  return result[0].affectedRows; 
};

  {/* */}
export const deleteProduto = async (id) => {
  const result = await pool.query("DELETE FROM produto WHERE ID_Produto = ?", [
    id,
  ]);
  return result[0].affectedRows; 
};