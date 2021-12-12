import { Router } from "express";

import advancedQueriesControllers from "../controllers/advancedQueriesControllers";

const advancedQueriesRoutes = Router();

advancedQueriesRoutes.get(
  "/clinics/:nomeEspec",
  advancedQueriesControllers.listClinicBySpecialty
);

advancedQueriesRoutes.get(
  "/",
  advancedQueriesControllers.listDoctorsBySpecialty
);

export { advancedQueriesRoutes };
