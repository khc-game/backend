class IModule {
  title;
  person_ref;
  img;

  constructor(title, person_ref, img) {
    this.title = title;
    this.person_ref = person_ref;
    this.img = img;
  }

  /**
   * 
   * @param map_ref - передать мир
   */
  actionWhenSelect(map_ref) {
    console.error("Implement actionWhenSelect for IModule instance");
  }

  /**
   * 
   * @param map_ref - передать мир
   * @param i
   * @param j
   */
  actionWhenUse(map_ref, {i, j}) {
    console.error("Implement actionWhenUse for IModule instance");
  }

  /**
   * 
   * @param map_ref - передать мир
   */
  afterMove(map_ref) {}
};

export default IModule;