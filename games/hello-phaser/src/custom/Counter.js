/**
 * This simple example accepts a Phaser.Scene in the constructor, and uses its methods.
 *
 * Extending EventEmitter to emit custom events.
 *
 * */

export default class Counter extends Phaser.Events.EventEmitter {
  constructor(scene, begin = 10, end = 0) {
    super();
    this.scene = scene;
    this.begin = begin;
    this.end = end;

    // note: we are creating and ADDING to the scene.
    this.consoleTxt = scene.add.text(100, 100, "hello!");

    this.cntEvent = this.initTimer();

    // Inside your Phaser scene
    // this.scene.events = new Phaser.Events.EventEmitter();
  }

  initTimer() {
    // To delay a function, we need Clock.
    // Here we use the Scene Time and Clock Plugin since we get Scene in the constructor:
    return this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.countDown,
      callbackScope: this,
    });
  }

  countDown() {
    console.log("Counter tick!");

    // An integer value representing the number of seconds
    // that have passed since the scene started.
    var timePassed = Math.floor(this.scene.time.now / 1000);

    var timeLeft = this.begin - timePassed;

    this.consoleTxt.text = "Left:" + timeLeft;

    // detect when countdown is over
    if (timeLeft <= 0) {
      timeLeft = 0;
      this.cntDown_timeOver = true;
      this.scene.time.removeEvent(this.cntEvent);

      // Emit a custom event
      this.emit("COUNTDOWN_COMPLETE", "eventData");
    }
  }
}
