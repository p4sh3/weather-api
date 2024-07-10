import { getCoordenadas } from "../utils/utils.js";

export const getCoordenadasController = async (req, res, next) => {
  const { direccion } = req.query;

  try {
    const { long, lat } = await getCoordenadas(direccion);
    res.send({ long, lat });
  } catch (error) {
    next(error);
  }
};
