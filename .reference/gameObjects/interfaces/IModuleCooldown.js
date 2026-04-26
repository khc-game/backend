import IModule from "./IModule";

class IModuleCooldown extends IModule {
  cooldownConst;
  cooldownCurrent;

  constructor(title, person_ref, img, cooldown) {
    super(title, person_ref, img);
    this.cooldownConst = cooldown;
    this.cooldownCurrent = 0;
  }

  isBlocked() {
    return this.cooldownCurrent > 0 ? true : false;
  }

  actionWhenUse(map_ref, {i, j}) {
    this.cooldownCurrent = this.cooldownConst + 1;
  }
  
  afterMove(map_ref) {
    if (this.cooldownCurrent > 0) {
      --this.cooldownCurrent;
    }
  }
}

export default IModuleCooldown;
