{/* */}

{/* */}
import express from "express";

{/* */}
import { 
    listarVeiculosPorRegiao, 
    getVeiculoAtual 
} from "../controllers/veiculoController.js";

{/* */}
const router = express.Router();
router.get("/", listarVeiculosPorRegiao);
router.get("/atual", getVeiculoAtual);

export default router;