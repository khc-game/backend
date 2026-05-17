// modules
import MoveModule from "./MoveModule.js";

export default class ModuleFactory {
  static create(data) {
    const [moduleName, ...args] = data;

    switch (moduleName) {
      case "MoveModule": {
        const [radius] = args;
        return new MoveModule(radius);
        break;
      }

      case "AttackModule": {
        const [damage, radius] = args;

        break;
      }

      case "VampirismModule": {
        const [blood, radius] = args;

        break;
      }

      case "TeleportModule": {
        const [cooldown] = args;

        break;
      }

      case "PotionModule": {
        const [heal, cooldown, radius] = args;

        break;
      }
    }
  }
}
