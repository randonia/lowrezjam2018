class Player {
  constructor(opts = {}) {
    const {
      scene,
      x = 0,
      y = 0,
    } = opts;
    this.scene = scene;
    if (!this.scene) {
      throw new Error('Missing scene');
    }
    this._sprite = scene.physics.add.sprite(x, y, 'player');
  }
}
