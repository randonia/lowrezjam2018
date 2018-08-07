/*
 * Component that behaves as a perception sphere.
 */
class PerceptionCompoent extends BaseComponent {
  set radius(value) {
    this._radius = value;
    this.resizeCircle();
  }
  get radius() {
    return this._circle;
  }
  constructor(opts = {}) {
    super(opts);
    const {
      scene,
      radius = 32,
    } = opts;
    const circle = scene.physics.add.image(NaN, NaN, 'circle')
    circle.body.debugBodyColor = 0x00ff00;
    circle.visible = false;
    this._circle = circle;

    this.radius = radius;

    PhysicsManager.register(circle, PHYS_GROUPS.PERCEPTION, true)
  }
  update() {
    // Assumes that controller exists and has a sprite property
    const {
      x,
      y
    } = this.controller.sprite.getCenter();
    this._circle.setPosition(x, y);
  }
  resizeCircle() {
    const offsetX = -this._radius + this.controller.sprite.width * 0.5;
    const offsetY = -this._radius + this.controller.sprite.height * 0.5;
    console.log('offsetX=%s offsetY=%s', offsetX, offsetY);
    this._circle.body.setCircle(this._radius, offsetX, offsetY);
  }
}
