// modules
import MoveModule from "./MoveModule.js";
import AttackModule from "./AttackModule.js";

export default class ModuleFactory {
  static create(data) {
    const [moduleName, ...args] = data;

    switch (moduleName) {
      case "MoveModule": {
        const [radius] = args;
        return new MoveModule(radius);
      }

      case "AttackModule": {
        const [damage, radius] = args;
        return new AttackModule(damage, radius);
      }

      case "VampirismModule": {
        const [blood, radius] = args;
      }

      case "TeleportModule": {
        const [cooldown] = args;
      }

      case "PotionModule": {
        const [heal, cooldown, radius] = args;
      }
    }
  }
}
