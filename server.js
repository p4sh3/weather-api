import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "node:path"
import { coordinatesRouter } from "./routes/coordenadasRoutes.js";
import { weatherRouter } from "./routes/climaRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static(path.join(import.meta.dirname, "public", "dist")));




app.get("/", (_, res) => {
  res.sendFile(path.join(import.meta.dirname, "public", "dist", "index.html"));
});

app.use("/coordenadas", coordinatesRouter)
app.use("/clima", weatherRouter)

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});
