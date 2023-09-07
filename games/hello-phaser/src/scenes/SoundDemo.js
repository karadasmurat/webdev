import Button from "../custom/Button.js";

export default class SoundDemo extends Phaser.Scene {
  constructor() {
    super({ key: "sound" });
  }

  init() {}
  preload() {
    this.load.image("audio", "assets/img/audio-2.png");
    this.load.audio("laser", "assets/audio/laser6.mp3");
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add a new sound into the sound manager
    this.audio_laser = this.sound.add("laser");

    // this.addTextButton();

    const centerX = this.cameras.main.width / 2;
    this.btn2 = new Button(this, centerX, 200, "audio", this.playAudio);
  }

  addTextButton() {
    this.btn_Text = this.add.text(20, 20, "Click to play", {
      fontSize: 30,
    });
    this.btn_Text.setInteractive({ cursor: "pointer" });

    this.btn_Text.on("pointerdown", this.playAudio, this);
  }

  playAudio() {
    console.log("Play audio");
    // 1. Play this sound - Phaser.Sound.WebAudioSound.play()
    this.audio_laser.play();
    // 2. Use soundmanager to play a new sound on the fly without the need to keep a reference to it.
    // The sound will be automatically removed (destroyed) once playback ends.
    this.sound.play("laser");
  }
  update() {}
}
