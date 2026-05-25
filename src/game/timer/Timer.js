export default class Timer {
  pl1 = null;
  pl2 = null;
  currentPlayerTimer = null;

  constructor(pl1, pl2) {
    // const sessionSec = 60 * 10; // 10 minutes
    const sessionSec = 5;
    this.pl1 = { socketId: pl1, timer: sessionSec };
    this.pl2 = { socketId: pl2, timer: sessionSec };
    this.currentPlayerTimer = this.pl1;
  }

  decrease() {
    this.currentPlayerTimer.timer -= 1;
  }

  switch() {
    this.currentPlayerTimer = this.currentPlayerTimer === this.pl1 ? this.pl2 : this.pl1;
  }
}
