{/* Classe de Controle Para a Rota de Dados dos Clientes */}

{/* Import do Método da Classe de Modelo  */}
import { getClientesByRegiao } from "../models/clienteModel.js"; 

{/* Export do Método de Listagem Ligado Diretamente ao Banco */}
export const listarClientes = async (req, res) => {

  {/* Props de Requisição */}
  const { regiao } = req.query; 

  if (!regiao) {
    
    {/* Props de Resposta Após a Requisição */}
    return res.status(400).json({ 
      message: "ID da Região é obrigatório para listar clientes.",
    });
  }

  {/* Chamada do Método da Classe de Modelo */}
  try {
    const clientes = await getClientesByRegiao(regiao);

    res.json(clientes);
  } catch (err) {
    console.error("Erro no Controller ao listar clientes:", err);
    res.status(500).json({
      message: "Erro interno do servidor ao listar clientes.",
      error: err.message,
    });
  }
};