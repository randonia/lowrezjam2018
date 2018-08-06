const WOLF_STATE = {
  IDLE: 0,
  MOVING: 1,
  ATTACKING: 2,
};

class Wolf extends ZObject {
  constructor(opts = {}) {
    super(opts);
    const {
      scene,
      x = 0,
      y = 0,
    } = opts;
    this._name = `wolf_${rndName()}`;
    this._collidesWith = PHYS_LAYERS.PLAYER;
    this._collisionFlags = PHYS_LAYERS.ENEMY;

    this._sprite = this.createPhysicsSprite(x, y, 'wolf', PHYS_GROUPS.ENEMY, 6, 3);
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('wolf', {
        start: 0,
        end: 3
      }),
      frameRate: 5,
      repeat: -1,
    });

    this._sprite.play('idle');
    this._state = WOLF_STATE.IDLE;
  }
  update() {}
}
