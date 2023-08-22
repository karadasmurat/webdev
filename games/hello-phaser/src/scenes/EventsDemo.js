export default class EventsDemo extends Phaser.Scene {
  constructor() {
    super({ key: "events" });
  }

  preload() {
    // Load Images for Timer Bar
    this.load.image("green-bar", "assets/img/health-green.png");
    this.load.image("red-bar", "assets/img/health-red.png");
  }

  create() {
    this.clicks = 0;
    this.bonus = 0;

    this.cntDown_timeLimit = 10;
    this.cntDown_timeOver = false;

    // Timer Bar
    this.addProgressIndicator(200, 20, 100, 10);

    this.scoreText = this.add.text(16, 16, `clicks: ${this.clicks}`);
    this.bonusText = this.add.text(16, 50, `bonus: ${this.bonus}`);
    this.timerInfo = this.add.text(16, 100);
    this.timerText = this.add.text(16, 150);
    this.repeatText = this.add.text(16, 200);
    this.countUpText = this.add.text(16, 250);
    this.countDownText = this.add.text(16, 300);

    this.addListeners();
  }

  update() {
    this.timerInfo.setText(
      `Event.progress: ${this.timedEvent.getProgress().toString().substr(0, 4)}`
    );

    this.countUp();

    if (!this.cntDown_timeOver) {
      this.countDown();
    }
  }

  addListeners() {
    // Set up input to collect coins
    this.input.on("pointerdown", this.handleClick, this);

    // Listen for the 'collectCoin' event
    this.events.on("bonusevent", this.handleBonus, this);

    // v1 Schedule a timer event after 2000 milliseconds (2 seconds)
    // When the designated amount of time has elapsed, a custom function will be called to perform whatever actions you decide.
    // this.time.addEvent({
    //   delay: 2000,
    //   callback: this.timer_cb, // The callback which will be called when the Timer Event fires.
    //   callbackScope: this,
    // });

    //  v2 The same as above, but uses a method signature to declare it (shorter, and compatible with GSAP syntax)
    this.timedEvent = this.time.delayedCall(3000, this.timer_cb, [], this);

    // Add Timer for Repeated Event
    this.cnt = 3;
    this.time.addEvent({
      delay: 1000,
      callback: this.countDown_repeat, // The callback which will be called when the Timer Event fires.
      callbackScope: this,
      repeat: 3, // Repeat count
    });
  }

  handleClick() {
    ++this.clicks;
    this.scoreText.setText(`clicks: ${this.clicks}`);

    // Emit the "bonusevent" event, with a bonus data payload.
    const randBonus = Math.floor(Math.random() * 10) + 1;
    this.events.emit("bonusevent", randBonus);
  }

  handleBonus(val) {
    console.log("Collected coin bonus", val);
    this.bonus += val;
    this.bonusText.setText(`bonus: ${this.bonus}`);
  }

  timer_cb() {
    console.log("Timer event triggered!");
    this.timerText.setText("Time is up! - event cb!");
  }

  countDown_repeat() {
    console.log("countdown", this.cnt);

    this.countDownText.setText(this.cnt);

    --this.cnt;
  }

  countUp() {
    // An integer value representing the number of seconds that have passed since the scene started.
    var timePassed = Math.floor(this.time.now / 1000);
    var min = Math.floor(timePassed / 60);
    var sec = timePassed % 60;

    if (min < 10) {
      min = "0" + min;
    }
    if (sec < 10) {
      sec = "0" + sec;
    }

    this.countUpText.text = "Time " + min + ":" + sec;
  }

  countDown() {
    // An integer value representing the number of seconds that have passed since the scene started.
    const elapsedSeconds = Math.floor(this.time.now / 1000);
    console.log(elapsedSeconds);
    let timeLeft = this.cntDown_timeLimit - elapsedSeconds;

    // detect when countdown is over
    if (timeLeft <= 0) {
      timeLeft = 0;
      this.cntDown_timeOver = true;
    }

    this.countDownText.text = "Left:" + timeLeft;

    // Calculate the time passed as a value between 0 and 1
    const passedTimeRatio = elapsedSeconds / this.cntDown_timeLimit;

    this.updateProgressIndicator(200, 20, 100, 10, passedTimeRatio);
  }

  addProgressIndicator(x, y, w, h, border = 3) {
    // When you initially create a Graphics object it will be empty.
    // The progressBox is background rectangle, representing 100%
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0xfa8072, 0.5);
    this.progressBox.fillRect(
      x - border,
      y - border,
      w + 2 * border,
      h + 2 * border
    );

    // The progressBar representing actual progress
    this.progressBar = this.add.graphics();
    this.progressBar.fillStyle(0xffffff, 1);
  }

  updateProgressIndicator(x, y, w, h, val) {
    this.progressBar.fillRect(x, y, w * val, h);
  }
}
