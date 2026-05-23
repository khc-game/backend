export default class Timer {
  pl1 = null;
  pl2 = null;
  currentPlayerTimer = null;
  interval = null;

  constructor(pl1, pl2) {
    const sessionSec = 60 * 10; // 10 minutes
    this.pl1 = { socketId: pl1, timer: sessionSec };
    this.pl2 = { socketId: pl2, timer: sessionSec };
    this.currentPlayerTimer = this.pl1;
  }

  start() {
    this.interval = setInterval(() => {
      this.currentPlayerTimer.timer -= 1;
      console.log(this.currentPlayerTimer);

      if (this.currentPlayerTimer.timer < 1) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  switch() {
    this.currentPlayerTimer = this.currentPlayerTimer === this.pl1 ? this.pl2 : this.pl1;
  }

  stop() {
    clearInterval(this.interval);
  }
}
