// prisma
import prisma from "../config/prisma.js";

export default class UserService {
  static async getById(id) {
    const [res] = await prisma.user.findMany({
      where: {
        id,
      },
    });

    return res;
  }
}
