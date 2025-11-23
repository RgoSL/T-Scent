  {/* */}

  {/* */}
import { 
  listarNotasComItens, 
  createNotaFiscal,
  createItensVenda,
  updateVenda,
  deleteVenda
} from "../models/vendaModel.js";

  {/* */}
import { getVendaById } from "../models/vendaModel.js";

  {/* */}
export const getVenda = async (req, res) => {
  const { id } = req.params;
  try {
    const venda = await getVendaById(id);
    if (!venda) {
      return res.status(404).json({ message: "Venda não encontrada." });
    }
    res.json(venda);
  } catch (err) {
    console.error("Erro ao buscar venda:", err);
    res.status(500).json({ message: "Erro ao buscar venda." });
  }
};

  {/* */}
export const getNotas = async (req, res) => {
  try {
    const { regiao } = req.query;
    const notas = await listarNotasComItens(regiao || null);
    res.json(notas);
  } catch (err) {
    console.error("Erro ao listar vendas:", err);
    res.status(500).json({ message: "Erro ao listar vendas." });
  }
};

  {/* */}
export const cadastrarVenda = async (req, res) => {
  try {
    const { vendedorId, clienteId, itens } = req.body;

    if (!vendedorId || !clienteId || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ message: "Dados incompletos para o cadastro da venda." });
    }
    const notaId = await createNotaFiscal(vendedorId, clienteId);
    await createItensVenda(notaId, itens);

    res.status(201).json({ message: "Venda registrada com sucesso.", notaId });
  } catch (error) {
    console.error("Erro ao cadastrar venda:", error);
    res.status(500).json({ message: "Erro interno ao cadastrar venda.", error });
  }
};

  {/* */}
export const atualizarVenda = async (req, res) => {
  const { id } = req.params;
  const { itens } = req.body;

  if (!Array.isArray(itens)) {
    return res.status(400).json({ message: "Lista de itens é obrigatória." });
  }

  try {
    const affectedRows = await updateVenda(id, itens);
    
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Venda não encontrada ou não alterada." });
    }

    res.json({ message: "Venda atualizada com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar venda:", error);
    res.status(500).json({ message: "Erro interno ao atualizar venda." });
  }
};

  {/* */}
export const excluirVenda = async (req, res) => {
  const { id } = req.params;

  try {
    const affectedRows = await deleteVenda(id);
    if (affectedRows === 0) {
      return res.status(404).json({ message: "Venda não encontrada." });
    }
    res.json({ message: "Venda excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir venda:", error);
    res.status(500).json({ message: "Erro interno ao excluir venda." });
  }
};