/**
 * In Phaser, before you can use any assets, you must first load them in preload function of the scene.
 * If you load a large number of assets, it can take some time for all of the assets to be loaded into the game,
 * and this is where a preloader really makes a difference.
 */

import ProgressBar from "../custom/ProgressIndicator.js";

export default class LoadingDemo extends Phaser.Scene {
  constructor() {
    super({ key: "loading" });
  }

  init() {
    // inline, OLD
    this.addProgressIndicator();

    // Create an instance of the ProgressBar class
    this.progressBar_load = new ProgressBar(this, 10, 150, 200, 50);
  }

  addProgressIndicator() {
    this.add.text(10, 90, "Loading Assets...", {
      fontSize: "16px",
      fill: "salmon",
    });
    const border = 3;

    // When you initially create a Graphics object it will be empty.
    // The progressBox is background rectangle, representing 100%
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0xfa8072, 0.5);
    this.progressBox.fillRect(
      10 - border,
      10 - border,
      200 + 2 * border,
      50 + 2 * border
    );

    // The progressBar representing actual progress
    this.progressBar = this.add.graphics();
    this.progressBar.fillStyle(0xffffff, 1);
  }

  updateProgressIndicator(val) {
    this.progressBar.fillRect(10, 10, 200 * val, 50);
  }

  preload() {
    this.load.image("player", "assets/img/sky-clouds.jpg");

    // simulate loading a large number of assets
    for (var i = 0; i < 500; i++) {
      this.load.image("dummy" + i, "assets/img/sky-clouds.jpg");
    }

    this.loadEvents();
  }

  create() {
    this.cntDown_timeLimit = 10;
    this.cntDown_timeOver = false;

    // Create an instance of the ProgressBar class
    this.progressBar = new ProgressBar(this, 10, 300, 100, 10);
  }

  update() {
    if (!this.cntDown_timeOver) this.countDown();
  }

  countDown() {
    // An integer value representing the number of seconds that have passed since the scene started.
    const elapsedSeconds = Math.floor(this.time.now / 1000);

    let timeLeft = this.cntDown_timeLimit - elapsedSeconds;

    // detect when countdown is over
    if (timeLeft <= 0) {
      timeLeft = 0;
      this.cntDown_timeOver = true;
      this.events.emit("expired");
    }

    // Calculate the time passed as a value between 0 and 1
    const passedTimeRatio = elapsedSeconds / this.cntDown_timeLimit;
    this.progressBar.setProgress(passedTimeRatio); // calculate new progress value
  }

  //add events
  loadEvents() {
    /**
     * creates a few event listeners that will listen for progress, fileprogress, and complete events
     * that are emitted from Phaser’s LoaderPlugin
     */

    // When the progress  event is emitted, you will also receive a value between 0 and 1
    this.load.on("progress", (val) => {
      console.log(val);

      // inline, OLD
      this.updateProgressIndicator(val);

      this.progressBar_load.setProgress(val); // calculate new progress value
    });

    this.load.on("fileprogress", function (file) {
      console.log(file.src);
    });

    this.load.on("complete", function () {
      console.log("Loading complete.");
    });

    this.events.on("expired", () => {
      this.add.text(10, 400, "Time out.");
    });
  }
}
