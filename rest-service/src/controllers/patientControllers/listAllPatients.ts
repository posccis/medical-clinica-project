import { NextFunction, Request, Response } from "express";

import logging from "../../config/logging";
import { Connect, Query } from "../../config/mysql";

const NAMESPACE = "patient";

const listAllPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Getting all patients.");

  const query = "SELECT * FROM paciente";

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((results) => {
          logging.info(NAMESPACE, "Retrieved patients: ", results);

          return res.status(200).json({
            results,
          });
        })
        .catch((error) => {
          logging.error(NAMESPACE, error.message, error);

          return res.status(200).json({
            message: error.message,
            error,
          });
        })
        .finally(() => {
          logging.info(NAMESPACE, "Closing connection.");
          connection.end();
        });
    })
    .catch((error) => {
      logging.error(NAMESPACE, error.message, error);

      return res.status(200).json({
        message: error.message,
        error,
      });
    });
};

export { listAllPatients };
