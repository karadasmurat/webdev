import ProgressBar from "./ProgressBar.js";

/**,
 *
 */
export default class GameTimer extends Phaser.GameObjects.GameObject {
  constructor(scene, x, y, timeLimit) {
    super(scene, x, y);

    this.timeLimit = timeLimit;
    this.timeLeft = timeLimit;

    this.progressbar = new ProgressBar(
      scene,
      x,
      y,
      this.timeLeft,
      this.timeLimit
    );

    //start automatically
    // this.startTimer();
    this.timerEvent = null;
  }

  startTimer() {
    console.log("Start GameTimer.", this.timeLeft);
    // IMPORTANT! interval kuruluyor, ancak ilk callback delay kadar sonra calisacak
    // Timer kurulduğu anda göstergeyi manuel fulleyelim, sonrası handleTick()
    this.progressbar.setValue(this.timeLeft);

    // Create a timer event to update the remaining time every second
    this.timerEvent = this.scene.time.addEvent({
      delay: 1000, // 1000
      callback: this.handleTick,
      callbackScope: this,
      loop: true,
    });

    // console.log(this.timerEvent);
  }

  handleTick() {
    console.log("Tick");

    this.timeLeft = Phaser.Math.Clamp(this.timeLeft - 1, 0, this.timeLimit);
    // console.log("timeLeft: ", this.timeLeft);
    this.progressbar.setValue(this.timeLeft);

    if (this.timeLeft <= 0) {
      console.log("GameTimer: emit TIMEOUT and stop.");
      this.emit("TIMEOUT", "No additional data");
      this.stop();
    }
  }

  reset() {
    console.log("Reset GameTimer.");
    // clearInterval, if it exists
    // if (this.timerEvent) {
    //   console.log("Remove existing Interval.");
    //   this.stop();
    // }
    this.stop();

    this.timeLeft = this.timeLimit;

    // setInterval
    this.startTimer();
  }

  stop() {
    // Schedules all active Timer Events for removal at the start of the frame.
    this.scene.time.removeAllEvents();
    this.timerEvent = null;
  }
}
