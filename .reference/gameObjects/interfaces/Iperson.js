// interface
import IGameObject from './IGameObject';

class IPerson extends IGameObject{
  name;
  modules;
  _maxhp;
  hp;
  isDead;

  constructor(name, modules, hp, map_ref, i, j) {
    super(i, j, map_ref);
    this.name = name;
    this.modules = modules;
    this._maxhp = hp;
    this.hp = hp;
    this.isDead = false;
  }

  // basic reactions
  afterMove() {
    for (let i = 0; i < this.modules.length; ++i) {
      this.modules[i].afterMove(this.map_ref);
    }
  }
  
  damage(damage) {
    this.hp -= damage;
    
    if (this.hp < 1) {
      this.isDead = true;
    } else 
    if (this.hp > this._maxhp) {
      this.hp = this._maxhp;
    }
  }
};

export default IPerson;