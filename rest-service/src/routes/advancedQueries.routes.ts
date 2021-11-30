import { Router } from "express";

import advancedQueriesControllers from "../controllers/advancedQueriesControllers";

const advancedQueriesRoutes = Router();

advancedQueriesRoutes.post(
  "/clinic",
  advancedQueriesControllers.listClinicBySpecialty
);

advancedQueriesRoutes.get(
  "/:nomeEspec",
  advancedQueriesControllers.listDoctorsBySpecialty
);

export { advancedQueriesRoutes };
