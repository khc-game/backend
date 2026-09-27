// service
import AuthService from "../service/auth.service.js";

export default class AuthController {
  static async register(req, res) {
    const { username, password } = req.body;
    await AuthService.create(username, password);

    res.sendStatus(200);
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const tokens = await AuthService.login(username, password);
    const { accessToken, refreshToken } = tokens;

    res.status(200).send({ accessToken, refreshToken });
  }

  static async changePassword(req, res) {
    res.sendStatus(503);
  }

  static async forgotPassword(req, res) {
    res.sendStatus(503);
  }

  static async resetPassword(req, res) {
    res.sendStatus(503);
  }
}
