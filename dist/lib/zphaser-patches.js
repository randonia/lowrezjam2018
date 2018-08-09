// Because [Object object] is for suckers
Phaser.Math.Vector2.prototype.toString = function() {
  return `(${this.x},${this.y})`;
}
