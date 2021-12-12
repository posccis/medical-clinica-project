import { Router } from "express";

import ProceduresControllers from "../controllers/ProceduresControllers";

const procedureRoutes = Router();

procedureRoutes.get(
  "/medico/",
  ProceduresControllers.pc_BuscaEndereco
);

procedureRoutes.get(
  "/medicas/",
  ProceduresControllers.pc_medicas
);

export { procedureRoutes };
