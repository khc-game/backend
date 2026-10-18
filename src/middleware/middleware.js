// services
import UserService from "../service/user.service.js";

// utils
import JWT from "../utils/jwt.js";

export default class Middleware {
  static async accessToken(req, res, next) {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      throw new Error("Empty token");
    }

    // TODO: parse token
    const parsedUserData = JWT.verify(accessToken);

    // get user from db
    const userFromDB = await UserService.getById(parsedUserData.userId);

    // check version
    if (userFromDB.token_version !== parsedUserData.version) {
      throw new Error("Token expired");
    }

    // check username
    if (userFromDB.username !== parsedUserData.username) {
      throw new Error("Invalid token");
    }

    // apply user data on req.user
    req.user = {
      id: userFromDB.id,
      username: userFromDB.username,
      created_at: userFromDB.created_at,
    };

    next();
  }
}
