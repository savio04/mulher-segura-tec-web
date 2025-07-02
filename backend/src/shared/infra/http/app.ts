import express from "express"
import cors from "cors"
import { errorMiddleware } from "./middlewares/error-middleware"
import { PgConnection } from "../postgres";
import { routesV1 } from "./routes";

export const app = express();

(async () => {
  await PgConnection.connect()
})()

app.use(cors())
app.use(express.json())
app.use(routesV1)
app.use(errorMiddleware)

