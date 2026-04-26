// modules
import MoveModule from "../classes/modules/MoveModule.js";
/**
 * 
 * @param {array} moduleData 
 * @returns single module object
 */
export default function moduleBuilder(moduleData) {
  const moduleName = moduleData.shift();

  switch(moduleName) {
    case "MoveModule": {
      return new MoveModule(...moduleData);
    } 
  }
}