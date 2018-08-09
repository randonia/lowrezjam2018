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

    const perceptionComponent = this.addComponent(COMPONENT_TYPES.Perception);
    perceptionComponent.on(EVENT_PERCEPTION_NEW, (payload) => this.onObserve(payload));
    perceptionComponent.on(EVENT_PERCEPTION_LOST, (payload) => this.onLostVision(payload));
    this._sprite.play('idle');
    this._state = WOLF_STATE.IDLE;
  }
  onObserve(payload) {
    const {
      target,
    } = payload;
    console.log('%s gained vision of %s ', this.name, target.name);
  }
  onLostVision(payload) {
    const {
      target
    } = payload;
    console.log('%s lost vision of %s', this.name, target.name);
  }
  onCollide(other) {
    if (other.name === 'player') {
      // CHOMP!
      if (DEBUG) {
        console.log('Fox chomping player');
      }
      other.takeChomp(this);
    }
  }
}
