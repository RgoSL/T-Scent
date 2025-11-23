{/* Classe de Controle da Rota dos Produtos */}

{/* Import Completo da Classe de Modelo do Produto */}
import * as ProdutoModel from "../models/produtoModel.js";

{/* Export do Método de Listagem dos Produtos */}
export const getAllProdutos = async (req, res) => {

{/* Métodos de Tratamento das Informações Obtidas */}
  try {
    const produtos = await ProdutoModel.getAllProdutos(); 
    res.json(produtos); {/* Retorno em Formato JSON Usando a Props de Resposta */}
  } catch (error) {
    console.error("Erro no Controller ao listar produtos:", error);
    res.status(500).json({ message: "Erro interno do servidor ao buscar produtos." });
  }
};

{/* Export do Método que Busca Produtos Específicos */}
export const getProdutoById = async (req, res) => {

  try {
    const { id } = req.params; {/* ID Sendo uma Necessidade da Requisição */}
    const produto = await ProdutoModel.getProdutoById(id); 

    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json(produto);;
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    res.status(500).json({ message: "Erro interno ao buscar produto." });
  }
};

{/* Export do Método de Criação de Novos Produtos */}
export const createProduto = async (req, res) => {
  try {
    const { nome, preco, qtdEstoque, marca } = req.body; {/* Método que Extrai os Dados Necessários Para Criar Novos Produtos */}
    const id = await ProdutoModel.createProduto(nome, preco, qtdEstoque, marca); 
    res.status(201).json({ message: "Produto criado com sucesso!", id });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao criar produto." });
  }
};

{/* Export do Método de Edição de Produtos */}
export const updateProduto = async (req, res) => {
  try {
    const { id } = req.params; {/* Linhas Como Essa Indicam que o ID Está Sendo Extraído Pelo Props de Requisições */}
    let { nome, preco, qtdEstoque, marca } = req.body;

    preco = Number(preco) || 0;
    qtdEstoque = Number(qtdEstoque) || 0;

    {/* Chamada do Método da Classe de Modelo Para Atualizar os Dados dos Produtos */}
    const linhasAfetadas = await ProdutoModel.updateProduto(id, nome, preco, qtdEstoque, marca);

    if (!linhasAfetadas) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
};

{/* Export do Método de Exclusão de Produtos */}
export const deleteProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const linhasAfetadas = await ProdutoModel.deleteProduto(id); {/* Chamada do Método da Classe de Modelo Para Excluir Produtos */}

    if (!linhasAfetadas) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.json({ message: "Produto excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir produto:", error);
    res.status(500).json({ message: "Erro ao excluir produto." });
  }
};