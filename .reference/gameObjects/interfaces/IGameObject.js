class IGameObject {
  map_ref;
  i;
  j;

  constructor(i, j, map_ref) {
    this.i = i; 
    this.j = j;
    this.map_ref = map_ref;
  }

  isMapOverflow(i, j) {
    if (
      i > -1 && i < this.map_ref.length &&
      j > -1 && j < this.map_ref[i].length
    ) {
      return false;
    } else {
      return true;
    }
  }
}

export default IGameObject;