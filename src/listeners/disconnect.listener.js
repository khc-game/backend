// classes
import Game from "../classes/Game.js";

export default async function disconnect(socket) {
  console.log('-------[disconnected]');
  console.log("id", socket.id);

  Game.removeFromQueue(socket);
  Game.gameEndByPlayerId(socket, "You won! Opponent lose connection");
}