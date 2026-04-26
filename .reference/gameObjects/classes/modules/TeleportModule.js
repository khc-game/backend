import IModuleCooldown from '../../interfaces/IModuleCooldown';
import iconImg from '../../../assets/modules/teleport.png';

class TeleportModule extends IModuleCooldown {
  constructor(person_ref, cooldown) {
    super("Teleport", person_ref, iconImg, cooldown);
  }

  actionWhenSelect(map_ref) {
    for (let i = 0; i < map_ref.length; ++i) {
      for (let j = 0; j < map_ref[i].length; ++j) {
        if (map_ref[i][j].person === null) {
          map_ref[i][j].isActiveSquare = true;
        }
      }
    }
  }

  actionWhenUse(map_ref, {i, j}) {
    const personData = this.person_ref;
    const {i: pI, j: pJ} = personData;
    
    map_ref[i][j].person = map_ref[pI][pJ].person;
    map_ref[pI][pJ].person = null;
    personData.i = i;
    personData.j = j;

    super.actionWhenUse(map_ref, {i, j});
  }
}

export default TeleportModule;