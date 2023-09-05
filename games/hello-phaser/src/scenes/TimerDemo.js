import Counter from "../custom/Counter.js";

export default class TimerDemo extends Phaser.Scene {
  constructor() {
    super({ key: "timer" });
  }

  preload() {
    this.load.image("carrot", "assets/img/carrot.png");
  }

  create() {
    this.counter = new Counter(this);
    this.handleCounterEvents();

    // Create a group to hold the falling carrots
    this.carrotsGroup = this.physics.add.group();

    // Set up a timer to create falling carrots every second
    this.timerEvent_carrot = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.createCarrot,
      callbackScope: this,
    });
  }

  handleCounterEvents() {
    // Add an event listener for the custom event
    this.counter.on(
      "COUNTDOWN_COMPLETE",
      function (data) {
        // Handle the event here
        console.log("Countdown complete:", data);
        this.time.removeEvent(this.timerEvent_carrot);
      },
      this
    );
  }

  update() {}

  createCarrot() {
    const x = Phaser.Math.Between(0, this.cameras.main.width); // Random x position

    // Create a new Arcade Physics Image object
    const carrot = this.physics.add.image(x, -20, "carrot");
    // Set a random tint color for variety
    carrot.setTint(Phaser.Math.RND.integerInRange(0x000000, 0xffffff));

    this.carrotsGroup.add(carrot); // Add carrot to the group
  }
}
