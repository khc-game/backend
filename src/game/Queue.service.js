export default class QueueService {
  static waiting = null;

  static add(socketId, characters, userData) {
    QueueService.waiting = [socketId, characters, userData];
  }

  static remove(socketId) {
    const isWaiterPlayer =
      QueueService.waiting !== null && QueueService.waiting[0] === socketId;
    if (isWaiterPlayer) {
      QueueService.waiting = null;
    }
  }
}
