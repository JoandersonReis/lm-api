import { prisma } from "../../../prisma/prisma"
import { TCreateUser } from "./types"

class UsersRepository {
  public async create(data: TCreateUser) {
    const user = await prisma.user.create({
      data,
    })

    return user ? true : false
  }
}

export const usersRepository = new UsersRepository()
