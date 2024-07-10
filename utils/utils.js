import axios from "axios"

export const getCoordenadas = async (ubicacion) => {
  const baseURL = `${process.env.MAPBOX_BASE_URL}/${encodeURIComponent(ubicacion)}.json?access_token=${process.env.MAPBOX_TOKEN}`;


  try {
    const { data } = await axios.get(baseURL)

    if (!data.features.length) {
      throw new Error("Ubicación no encontrada")
    }

    const [long, lat] = data.features[0].geometry.coordinates

    return { long, lat }

  } catch (error) {
    throw error;
  }
}


export const getClima = async (long, lat) => {
  const baseURL = `${process.env.OPENWEATHER_BASE_URL}?lat=${lat}&lon=${long}&appid=${process.env.OPENWEATHERMAP_TOKEN}&units=metric&lang=es`;


  try {

    const { data } = await axios.get(baseURL);

    const { current, daily, minutely, hourly } = data;


    return {
      temperature: current.temp,
      windSpeed: current.wind_speed,
      humidity: current.humidity,
      description: current.weather[0].description,
      icon: current.weather[0].icon,
      minTemperature: daily?.[0].temp.min ?? null,
      maxTemperature: daily?.[0].temp.max ?? null,
      summary: daily?.[0].summary ?? null,
      precipitation: minutely?.[0].precipitation ?? null,
      dailyPop: daily?.[0].pop ?? null
    };

  } catch (error) {
    throw new Error("Error al obtener datos del clima");
  }
}
