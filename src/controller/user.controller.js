export default class UserController {
  static async getMyProfile(req, res) {
    res.status(200).json({ user: req.user });
  }
}
