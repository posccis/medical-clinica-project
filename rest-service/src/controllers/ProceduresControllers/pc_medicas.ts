import { NextFunction, Request, Response } from "express";

import logging from "../../config/logging";
import { Connect, Query } from "../../config/mysql";

const NAMESPACE = "doctor";

const pc_medicas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logging.info(NAMESPACE, "Listing every doctor with her specialty");


  const query = `CALL Pc_medicass()`;

  Connect()
    .then((connection) => {
      Query(connection, query)
        .then((result) => {
          logging.info(
            NAMESPACE,
            "Every doctor with her specialty: ",
            result
          );
          console.log(query);

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


export { pc_medicas };
