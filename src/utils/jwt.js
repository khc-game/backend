import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export default class JWT {
  static code(data, expiresIn = "10m") {
    return jwt.sign(data, JWT_SECRET, { expiresIn });
  }

  static verify(token) {
    return jwt.verify(token, JWT_SECRET);
  }
}
