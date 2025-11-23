{/* Classe de Controle Para a Rota dos Dados Exibidos na Dashboard */}

{/* Import dos Métodos da Classe de Modelo */}
import {
  getRegiaoMetrics,
  getPontosEstrategicos,
} from "../models/dashboardModel.js";

{/* Export do Método que Retorna os Dados da Dashboard */}
export const getDashboardData = async (req, res) => {

{/* Método que Define o ID da Região Como uma Necessidade Para Fazer uma Requisição */}
  const regiaoId = req.query.regiao;

  if (!regiaoId && regiaoId !== 0) {
    return res.status(400).json({ message: "ID da Região é obrigatório." });
  }

{/* Métodos de Busca Direta no Banco */}
  try {
    const metrics = await getRegiaoMetrics(regiaoId); {/* Busca os Dados da Tabela Região */}
    const pontosE = await getPontosEstrategicos(regiaoId); {/* Busca os Pontos Estratégicos da Região */}

    {/* Props de Resposta Passa os Dados Encontrados Pelos Métodos de Busca Para um Formato JSON */}
    res.json({
      qtnVen: metrics.qtnVen || 0,
      qtnCli: metrics.qtnCli || 0,
      qtnVeiculo: metrics.qtnVeiculo || 0,
      nomeRegiao: metrics.Nome_Regiao,
      pontosE: pontosE,
    });
  } catch (error) {
    console.error("Erro no Controller Dashboard:", error);
    res
      .status(500)
      .json({ message: "Erro interno ao buscar dados do Dashboard." });
  }
};