// classes
import Game from "../classes/Game.js";

export default async function cancelPlay(socket) {
  console.log('-------[cancel play]');
  console.log("id", socket.id);

  Game.removeFromQueue(socket);
}