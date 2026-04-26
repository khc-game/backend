import IModule from '../../interfaces/IModule';
import iconImg from '../../../assets/modules/attack.png';

class AttackModule extends IModule{
  attack;
  radius;

  constructor(person_ref, attack = 1, radius = 1) {
    super("Attack", person_ref, iconImg);
    this.attack = attack;
    this.radius = radius;
  }

  actionWhenSelect(map_ref) {
    this.recursionSetActive(map_ref, this.person_ref.i, this.person_ref.j, this.radius);
  }

  recursionSetActive(map_ref, i, j, radius) {
    if (
      this.person_ref.isMapOverflow(i, j) ||
      radius < 0
    ) {
      return;
    }

    this.recursionSetActive(map_ref, i + 1, j, radius - 1);
    this.recursionSetActive(map_ref, i - 1, j, radius - 1);
    this.recursionSetActive(map_ref, i, j + 1, radius - 1);
    this.recursionSetActive(map_ref, i, j - 1, radius - 1);

    if (
      map_ref[i][j].person !== null &&
      !map_ref[i][j].person.isDead &&
      map_ref[i][j].person !== this.person_ref
    ) {
      map_ref[i][j].isActiveSquare = true;
    }

    if (i === this.person_ref.i && j === this.person_ref.j) {
      return;
    }
  }

  actionWhenUse(map_ref, {i, j}) {
    // наносить урон по указанным координатам
    map_ref[i][j].person.damage(this.attack);
  }
}

export default AttackModule;