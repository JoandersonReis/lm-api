import { Router } from "express"
import { ordersControllerAPI } from "./controllers/OrdersController/api"
import { usersControllerAPI } from "./controllers/UsersController/api"

const APIs = [usersControllerAPI, ordersControllerAPI]

const routes = Router()

APIs.forEach((api) => {
  routes.use(...api.getRoutes)
})

export default routes
