import { NextFunction, Request, Response } from "express";

import logging from "../../config/logging";
import { Connect, Query } from "../../config/mysql";

const NAMESPACE = "doctor";

const pc_BuscaEndereco = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Listing every clinic wich have this doctor");

  const { NomeMed } = req.body;

  const query = `CALL Pc_buscaEndereco_00("${NomeMed}");`;

  console.log(query);
  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(
            NAMESPACE,
            "Every clinic wich have this doctor: ",
            result
          );

          return res.status(200).json({
            result,
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

export { pc_BuscaEndereco };
