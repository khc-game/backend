import IModuleCooldown from '../../interfaces/IModuleCooldown';
import iconImg from '../../../assets/modules/potion.png';

class PotionModule extends IModuleCooldown{
  heal;
  radius;

  constructor(person_ref, heal = 10, cooldown = 1, radius = 1) {
    super("Potion", person_ref, iconImg, cooldown);
    this.heal = heal;
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

    if (map_ref[i][j].person !== null && map_ref[i][j].person.isDead === false) {
      map_ref[i][j].isActiveSquare = true;
    }

    if (i === this.person_ref.i && j === this.person_ref.j) {
      return;
    }
  }

  actionWhenUse(map_ref, {i, j}) {
    map_ref[i][j].person.damage(-this.heal);
    super.actionWhenUse(map_ref, {i, j});
  }
}

export default PotionModule;