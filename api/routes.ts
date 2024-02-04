import { Router } from "express"
import { usersControllerAPI } from "./controllers/UsersController/api"

const APIs = [usersControllerAPI]

const routes = Router()

APIs.forEach((api) => {
  routes.use(...api.getRoutes)
})

export default routes
