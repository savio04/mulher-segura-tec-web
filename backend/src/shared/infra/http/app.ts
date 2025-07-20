import express from "express";
import cors from "cors";
import { createServer } from "http"
import { Server } from "socket.io"
import { errorMiddleware } from "./middlewares/error-middleware";
import { PgConnection } from "../postgres";
import { routesV1 } from "./routes";

const app = express()
export const server = createServer(app)

export const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

(async () => {
  await PgConnection.connect();
})();

app.use(cors());
app.use(express.json());
app.use("/v1", routesV1);
app.use(errorMiddleware);

io.on("connection", (socket) => {
  console.log(`🔌 Dispositivo conectado: ${socket.id}`);

  const { device_id, device_secret } = socket.handshake.auth;
  console.log("Auth recebido:", device_id, device_secret);

  if (!device_id || !device_secret) {
    console.log("❌ Falha de autenticação: missing credentials");
    socket.disconnect(true);
    return;
  }

  socket.on("data", (payload) => {
    console.log("📡 Dados recebidos do device:", payload);
  });

  socket.on("disconnect", (reason) => {
    console.log(`❌ Dispositivo ${socket.id} desconectado: ${reason}`);
  });
});
