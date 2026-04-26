import IModule from '../../interfaces/IModule';
import iconImg from '../../../assets/modules/vampire.png';

class VampirismModule extends IModule{
  blood;
  radius;

  constructor(person_ref, blood = 10, radius = 1) {
    super("Vampirism", person_ref, iconImg);
    this.blood = blood;
    this.radius = radius;
  }

  actionWhenSelect(map_ref) {
    this.recursionSetActive(map_ref, this.person_ref.i, this.person_ref.j, this.radius);
  }

  recursionSetActive(map_ref, i, j, radius) {
    if ( this.person_ref.isMapOverflow(i, j) || radius < 0 ) {
      return;
    }

    this.recursionSetActive(map_ref, i + 1, j, radius - 1);
    this.recursionSetActive(map_ref, i - 1, j, radius - 1);
    this.recursionSetActive(map_ref, i, j + 1, radius - 1);
    this.recursionSetActive(map_ref, i, j - 1, radius - 1);

    if (map_ref[i][j].person !== null && this.person_ref !== map_ref[i][j].person) {
      map_ref[i][j].isActiveSquare = true;
    }

    if (i === this.person_ref.i && j === this.person_ref.j) {
      return;
    }
  }

  actionWhenUse(map_ref, {i, j}) {
    const targetPerson = map_ref[i][j].person;
    const targetHP = targetPerson.hp;

    map_ref[i][j].person.damage(this.blood);
    
    if (this.blood >= targetHP) {
      this.person_ref.damage(-targetHP);
    } else {
      this.person_ref.damage(-this.blood);
    }
  }
}

export default VampirismModule;