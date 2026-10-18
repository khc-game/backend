// prisma
import prisma from "../config/prisma.js";

// utils
import Bcrypt from "../utils/bcrypt.js";
import JWT from "../utils/jwt.js";

export default class AuthService {
  static async findByUsername(username) {
    const [userData] = await prisma.user.findMany({
      where: {
        username,
      },
    });

    return userData;
  }

  static async create(username, password) {
    // find username dublicates
    const userData = await AuthService.findByUsername(username);
    if (userData) {
      throw new Error("Username is busy");
    }

    // hash password
    const passwordHash = Bcrypt.hash(password);

    const [user, userAuth] = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          username,
        },
      });

      const userAuth = await tx.auth.create({
        data: {
          user_id: user.id,
          password_hash: passwordHash,
        },
      });

      return [user, userAuth];
    });

    return user;
  }

  static async login(username, password) {
    // user validate
    const user = await AuthService.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    // auth validate
    const [userAuth] = await prisma.auth.findMany({
      where: {
        user_id: user.id,
      },
    });

    if (!userAuth) {
      throw new Error("User not found");
    }

    // password validation
    const isPassValid = Bcrypt.compare(userAuth.password_hash, password);
    if (!isPassValid) {
      throw new Error("Invalid password");
    }

    // create token
    const { accessToken, refreshToken } =
      AuthService.generateTokensByUserData(user);

    // save token
    await prisma.token.create({
      data: {
        token: refreshToken,
        user_id: user.id,
      },
    });

    // return token
    return { accessToken, refreshToken };
  }

  static generateTokensByUserData(user) {
    const accessToken = JWT.code(
      {
        username: user.username,
        userId: user.id,
        version: user.token_version,
      },
      process.env.ACCESS_TOKEN_EXPIRES,
    );

    const refreshToken = JWT.code(
      {
        userId: user.id,
        version: user.token_version,
      },
      process.env.REFRESH_TOKEN_EXPIRES,
    );

    return { accessToken, refreshToken };
  }

  static async refreshToken(token) {
    // get token from DB
    const tokenData = (
      await prisma.token.findMany({
        where: {
          token,
        },
      })
    )[0];
    if (!tokenData) {
      throw new Error("Token expired");
    }

    // parse
    const parsedData = JWT.verify(token);

    // get user from db
    const user = (
      await prisma.user.findMany({
        where: {
          id: parsedData.userId,
        },
      })
    )[0];
    if (!user) {
      throw new Error("Invalid token");
    }

    // check version
    if (user.token_version !== parsedData.version) {
      throw new Error("Invalid token");
    }

    // generate tokens
    const tokens = AuthService.generateTokensByUserData(user);

    // update token
    await prisma.token.update({
      where: {
        token,
      },
      data: {
        token: tokens.refreshToken,
      },
    });

    return tokens;
  }
}
