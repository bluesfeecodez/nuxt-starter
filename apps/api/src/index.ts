import express from "express"
import helmet from "helmet"
import cors from "cors"
import { healthRouter } from "./routes/health.js"
import { dynamicPageRouter } from "./routes/dynamicPage.js"

const app = express()
const PORT = process.env.PORT ?? 3002

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use("/health", healthRouter)
app.use("/getDynamicPage", dynamicPageRouter)

app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`)
})

export default app
