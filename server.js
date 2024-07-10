import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import { coordinatesRouter } from "./routes/coordenadasRoutes.js";
import { weatherRouter } from "./routes/climaRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors({
  origin: 'https://weather-map-dev.netlify.app/',
  optionsSuccessStatus: 200,
  methods: ["GET"]
}))
app.use(express.json());


app.use("/api/coordenadas", coordinatesRouter)
app.use("/api/clima", weatherRouter)

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});
