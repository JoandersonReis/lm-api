import "dotenv/config"
import { PORT, app } from "./server"

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
