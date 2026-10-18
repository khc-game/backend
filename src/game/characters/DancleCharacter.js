// game
import DefaultCharacter from "./DefaultCharacter.js";
import Change from "../Change.js";

export default class DancleCharacter extends DefaultCharacter {
  constructor({
    key,
    hp,
    name,
    modules,
    cantSelect,
    cost,
    shop,
    playerId,
    modulesStack = [],
  }) {
    super({
      key,
      hp,
      name,
      modules,
      cantSelect,
      cost,
      shop,
      playerId,
    });

    this.move = 0;
    this.modulesStack = modulesStack;
  }

  clone() {
    const clone = new DancleCharacter(this);

    clone.hp = this.maxHP;
    clone.maxHP = this.maxHP;
    clone.modules = this.modules.map((module) => module.copy());
    clone.modulesStack = this.modulesStack.map((modules) =>
      modules.map((module) => module.copy()),
    );

    return clone;
  }

  afterMove(map, playerId, fromI, fromJ, changes, charI, charJ) {
    super.afterMove(map, playerId, fromI, fromJ, changes, charI, charJ);

    ++this.move;

    if (this.move % 10 === 0) {
      const damageSize = 10;
      this.damaged(damageSize);
      this.maxHP -= damageSize;

      changes.push(Change.damage(charI, charJ, damageSize));

      // change modules stack to another
      const modulesStack = this.modulesStack?.shift();
      if (modulesStack) {
        this.modules = modulesStack;
        changes.push(Change.modulesUpdate(this.modules, charI, charJ));
      } else {
        this.afterMove = super.afterMove;
      }
    }
  }
}
