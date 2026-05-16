export default class QueueService {
  static waiting = null;

  static add(socketId, characters) {
    QueueService.waiting = [socketId, characters];
  }
}