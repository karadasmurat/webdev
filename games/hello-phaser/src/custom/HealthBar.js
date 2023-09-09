/**
 * E
 */

import events from "./Events.js";

export default class HealthBar extends Phaser.Events.EventEmitter {
  constructor(scene, x, y, maxHealth = 3) {
    super();
    this.scene = scene;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.healthSprites = [];

    this.initBar(x, y);
  }

  initBar(x, y) {
    // Create individual health sprites and add them to the scene
    for (let i = 0; i < this.maxHealth; i++) {
      const heart = this.scene.add
        .sprite(x + i * 35, y, "heart")
        .setScale(0.5)
        .setOrigin(0);
      this.healthSprites.push(heart);
    }
  }

  // Decrease the current health by a specified amount
  damage(damageAmount = 1) {
    this.currentHealth -= damageAmount;
    this.currentHealth = Phaser.Math.Clamp(
      this.currentHealth,
      0,
      this.maxHealth
    );
    this.updateDisplay();

    if (this.currentHealth <= 0) {
      console.log("Game Over.");
      this.emit(events.NO_HEALTH, "No supporting data.");
    }
  }

  // Update the health bar based on the current health value
  updateDisplay() {
    // console.log("Updating. currentHealth=", this.currentHealth);
    this.scene.tweens.add({
      targets: this.healthSprites[this.currentHealth],
      y: 0,
      alpha: 0,
      duration: 1000,
      ease: "Power4", // The easing equation to use for the tween.
    });
  }
}
