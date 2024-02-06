import { prisma } from "../../../prisma/prisma"
import { TCreateUser, TLogin, TUserDB } from "./types"

class UsersRepository {
  public async create(data: TCreateUser) {
    const user = await prisma.user.create({
      data,
    })

    return user ? true : false
  }

  public async verify(data: TLogin): Promise<null | TUserDB> {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username,
      },
    })

    return user
  }
}

export const usersRepository = new UsersRepository()
