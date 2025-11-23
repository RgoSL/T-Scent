  {/* */}

  {/* */}
import { getVendedores, updateVendedor } from "../models/vendedorModel.js";

  {/* */}
import pool from "../config/db.js"; 

  {/* */}
export const login = async (req, res) => {
  const { email, senha } = req.body; 

  {/* */}
  try {
    const [rows] = await pool.query(
      `
            SELECT 
                v.ID_Vendedor, v.Nome, v.Email, v.Senha, v.Telefone, v.Endereco, 
                v.ID_Regiao, r.Nome_Regiao 
            FROM vendedor v
            INNER JOIN regiao r ON v.ID_Regiao = r.ID_Regiao
            WHERE v.Email = ?
            `,
      [email]
    );

    {/* */}
    if (rows.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const vendedor = rows[0];

    if (vendedor.Senha !== senha) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    {/* */}
    res.json({
      message: "Login bem-sucedido",
      vendedor: {
        id: vendedor.ID_Vendedor,
        nome: vendedor.Nome,
        email: vendedor.Email,
        regiaoId: vendedor.ID_Regiao, 
        regiaoNome: vendedor.Nome_Regiao, 
        telefone: vendedor.Telefone, 
        endereco: vendedor.Endereco, 
      },
    });
  } catch (err) {
    console.error("Erro no login:", err);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

  {/* */}
export const listarVendedores = async (req, res) => {
  try {
    const vendedores = await getVendedores();
    res.json(vendedores);
  } catch (err) {
    console.error("Erro ao buscar vendedores:", err);
    res.status(500).json({ message: "Erro ao buscar vendedores" });
  }
};

  {/* */}
export const atualizarVendedor = async (req, res) => {
  const { id } = req.params;
  const { email, telefone, endereco } = req.body;

    {/* */}
  if (!email || !telefone || !endereco) {
    return res
      .status(400)
      .json({ message: "Todos os campos são obrigatórios." });
  }

    {/* */}
  try {
    const affectedRows = await updateVendedor(id, email, telefone, endereco);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Vendedor não encontrado ou dados inalterados." });
    }

    res.json({ message: "Perfil atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar perfil do vendedor:", error);
    res.status(500).json({ message: "Erro interno ao atualizar perfil." });
  }
};