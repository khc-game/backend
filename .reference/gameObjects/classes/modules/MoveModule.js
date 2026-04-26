import IModule from '../../interfaces/IModule';
import iconImg from '../../../assets/modules/move.png';

class MoveModule extends IModule {
  radius;

  constructor(person_ref, radius = 1) {
    super("Move", person_ref, iconImg);
    this.radius = radius;
  }

  actionWhenSelect(map_ref) {
    this.recursionSetActive(map_ref, this.person_ref.i, this.person_ref.j, this.radius);
  }
  
  recursionSetActive(map_ref, i, j, radius) {
    if (
      this.person_ref.isMapOverflow(i, j) ||
      radius < 0 ||
      ((this.person_ref !== map_ref[i][j].person) && map_ref[i][j].person !== null)
    ) {
      return;
    }

    this.recursionSetActive(map_ref, i + 1, j, radius - 1);
    this.recursionSetActive(map_ref, i - 1, j, radius - 1);
    this.recursionSetActive(map_ref, i, j + 1, radius - 1);
    this.recursionSetActive(map_ref, i, j - 1, radius - 1);

    if (map_ref[i][j].person === null) {
      map_ref[i][j].isActiveSquare = true;
    }

    if (i === this.person_ref.i && j === this.person_ref.j) {
      return;
    }
  }

  actionWhenUse(map_ref, {i, j}) {
    const person = map_ref[this.person_ref.i][this.person_ref.j].person;
    map_ref[this.person_ref.i][this.person_ref.j].person = null;
    map_ref[i][j].person = person;
    person.i = i;
    person.j = j;
  }
}

export default MoveModule;