class IModule {
  constructor(title, img) {
    this.title = title;
    this.img = img;
  }

  /**
   * Returns array where be positions on board
   * 
   * @param {*} map_ref 
   * @param {*} i 
   * @param {*} j 
  */
  select(map_ref, i, j) {
    console.error("Implement actionWhenSelect for IModule instance");
  }

  /**
   * Returns array where be positions on board
   * 
   * @param {*} map_ref 
   * @param {*} i 
   * @param {*} j 
  */
  use(map_ref, i, j) {
    console.error("Implement actionWhenUse for IModule instance");
  }
};

export default IModule;