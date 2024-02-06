export type TCreateUser = {
  username: string
  name: string
  password: string
}

export type TLogin = {
  username: string
  password: string
}

export type TUserDB = {
  id: string
  username: string
  password: string
  created_at: Date
  name: string
}
