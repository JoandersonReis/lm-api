import { TMessage } from "./types"

class Messages {
  public static ErrorMessage(message: string, status: number = 400): TMessage {
    return {
      return: false,
      message,
      status,
    }
  }

  public static SuccessMessage(
    message: string,
    status: number = 200,
    data: [] | Object = []
  ): TMessage {
    return {
      return: true,
      message,
      status,
      ...data,
    }
  }
}

export default Messages
