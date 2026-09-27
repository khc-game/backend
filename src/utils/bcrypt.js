import bcrypt from "bcrypt";

const SALT = +process.env.SALT;

export default class Bcrypt {
  static hash(data) {
    return bcrypt.hashSync(data, SALT);
  }

  static compare(hashData, clearData) {
    return bcrypt.compareSync(clearData, hashData);
  }
}
