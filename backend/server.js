{/* */}

import express from "express"; {/* */}

import cors from "cors"; {/* */}

import dotenv from "dotenv"; {/* */}

import vendedoresRoutes from "./src/routes/vendedorRoutes.js"; {/* */}

import app from "./src/app.js"; {/* */}

import veiculosRoutes from "./src/routes/veiculosRoutes.js"; {/* */}

{/* */}
dotenv.config();

{/* */}
app.use("/veiculos", veiculosRoutes);

{/* */}
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`);
});