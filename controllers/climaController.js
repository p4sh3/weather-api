import { getClima } from "../utils/utils.js";

export const getClimaController = async (req, res, next) => {
  const { lat, long } = req.query;

  try {
    const clima = await getClima(long, lat);
    res.send({ ...clima, long, lat });
  } catch (error) {
    next(error);
  }
};
