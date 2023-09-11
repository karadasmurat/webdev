/**
 * Manage a visual representation of a player's health within a game.
 *
 * Custom Events:
 * NO_HEALTH: Emitted when the player's health reaches or falls below 0, indicating a game over scenario.
 */

import events from "./Events.js";

export default class HealthBar extends Phaser.Events.EventEmitter {
  constructor(scene, x, y, maxHealth = 3, width = 128) {
    super();
    this.scene = scene;
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.healthSprites = [];

    this.initBar(x, y, width);
  }

  initBar(x, y, width) {
    const TEXTURE_WIDTH = 128;
    const scaleFactor = width / (TEXTURE_WIDTH * this.maxHealth);

    // Create individual health sprites and add them to the scene
    for (let i = 0; i < this.maxHealth; i++) {
      const PADDING = 2;
      const heart = this.scene.add
        .sprite(x + i * (TEXTURE_WIDTH * scaleFactor + PADDING), y, "heart")
        .setScale(scaleFactor); // .setOrigin(0);
      this.healthSprites.push(heart);
    }
  }

  // Decrease the current health value by the specified damageAmount.
  // If the current health reaches or falls below 0, it emits a custom event named NO_HEALTH to signal a game over scenario.
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
    // The animation involves scaling down the sprite, moving it upwards, and fading it out over a specified duration.
    this.scene.tweens.add({
      targets: this.healthSprites[this.currentHealth],
      y: 10,
      scale: 0.2,
      alpha: 0,
      angle: 180,
      duration: 1000,
      ease: "Power4", // The easing equation to use for the tween.
    });
  }
}
