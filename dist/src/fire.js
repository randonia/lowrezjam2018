class Fire extends ZObject {
  constructor(opts) {
    super(opts);
    const {
      x,
      y,
      scene
    } = opts;
    this._otherDistCalcer = new Phaser.Math.Vector2();
    this._thisDistCalcer = new Phaser.Math.Vector2(x, y);

    this._name = `fire_${x}.${y}`;
    const sprite = this.createSprite(x, y, 'heating');
    // sprite.
    scene.anims.create({
      key: 'fire',
      frames: scene.anims.generateFrameNumbers('heating', {
        start: 12,
        end: 15,
      }),
      frameRate: 9,
      repeat: -1
    });
    sprite.play('fire');
    this._sprite = sprite;

    this._collisionFlags = PHYS_LAYERS.INTERACTIONS;
    this._collidesWith = PHYS_LAYERS.PLAYER;
    this._warmingRange = 13;
    if (PARAMS.debugbadcollisions) {
      this._debugGfx = scene.add.graphics();
    }
    PhysicsManager.registerBadCollision(this);
  }
  onCollide(other) {
    if (other.collisionFlags !== PHYS_LAYERS.PLAYER) {
      return;
    }
    // Take this out next time
    if (DEBUG) {
      console.log('Fire warming player - remove this log');
    }
  }
  collidesWith(other) {
    const isPlayer = other.collisionFlags === PHYS_LAYERS.PLAYER
    if (isPlayer) {
      const playerCenter = other.sprite.getCenter(this._otherDistCalcer);
      const distSqr = playerCenter.distanceSq(this._thisDistCalcer);
      return distSqr <= (this._warmingRange * this._warmingRange);
    }
    return false;
  }
  update() {
    super.update();
    if (PARAMS.debugbadcollisions) {
      this._debugGfx.clear();
      this._debugGfx.lineStyle(1, 0xFF2222, 0.75);
      this._debugGfx.fillStyle(0xffa500, 0.125);
      this._debugGfx.fillCircle(this.x, this.y, this._warmingRange);
      this._debugGfx.strokeCircle(this.x, this.y, this._warmingRange);
      this._debugGfx.beginPath();
      // this._debugGfx.moveTo(this._controller.x, this._controller.y);
      // this._debugGfx.lineTo(visionTarget.x, visionTarget.y);
      this._debugGfx.closePath();
      this._debugGfx.strokePath();
    }
  }
}
