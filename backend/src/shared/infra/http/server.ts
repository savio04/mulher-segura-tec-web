import "dotenv/config"
import { app } from "./app";

app.listen(process.env.HTTP_PORT || 8080, () => {
  console.log(`Api is running on port ${process.env.HTTP_PORT}`)
})
