const EVENT_PERCEPTION_NEW = 'perception:new';
const EVENT_PERCEPTION_LOST = 'perception:lost';
/*
 * Component that behaves as a perception sphere.
 */
class PerceptionComponent extends BaseComponent {
  get name() {
    return `PerceptionComponent_${(this._controller || { name: 'ISOLATED'}).name}`;
  }
  set radius(value) {
    this._radius = value;
    this.resizeCircle();
  }
  get radius() {
    return this._circle;
  }
  set controller(value) {
    this._controller = value;
    this._circle._controller = value;
  }
  constructor(opts = {}) {
    super(opts);
    const {
      scene,
      radius = 32,
    } = opts;
    const circle = scene.physics.add.image(NaN, NaN, 'circle')
    circle._component = this;
    circle.body.debugBodyColor = 0x00ff00;
    circle.visible = false;
    this._circle = circle;

    this.radius = radius;
    this._perceived = [];

    PhysicsManager.register(circle, PHYS_GROUPS.PERCEPTION, true)
    if (PARAMS.debugperception) {
      this._debugGfx = scene.add.graphics();
    }
  }
  update() {
    // Assumes that controller exists and has a sprite property
    const {
      x,
      y
    } = this._controller.sprite.getCenter();
    this._circle.setPosition(x, y);
    // See if we're not seeing anyone anymore
    let cleanupIdx = 0;
    while (cleanupIdx < this._perceived.length) {
      if (this._perceived[cleanupIdx].time < Date.now() - 250) {
        const removed = this._perceived.splice(cleanupIdx, 1);
        removed.forEach((removedPayload) => {
          this.emit(EVENT_PERCEPTION_LOST, removedPayload);
        });
      } else {
        // continue;
        cleanupIdx++;
      }
    }
    if (PARAMS.debugperception) {
      this._debugGfx.clear();

      this._perceived.forEach(({
        target: visionTarget
      }) => {
        this._debugGfx.lineStyle(1, 0xFFFF00, 0.5);
        this._debugGfx.beginPath();
        this._debugGfx.moveTo(this._controller.x, this._controller.y);
        this._debugGfx.lineTo(visionTarget.x, visionTarget.y);
        this._debugGfx.closePath();
        this._debugGfx.strokePath();
      });
    }
  }
  resizeCircle() {
    // lol +1 hack
    const offsetX = -this._radius + this._controller.sprite.width * 0.5 + 1;
    const offsetY = -this._radius + this._controller.sprite.height * 0.5 + 1;
    this._circle.body.setCircle(this._radius, offsetX, offsetY);
  }
  onCollide(target) {
    let seenTarget = false;
    for (var eIdx = 0; eIdx < this._perceived.length; eIdx++) {
      if (this._perceived[eIdx].target === target) {
        seenTarget = this._perceived[eIdx];
        break;
      }
    }
    if (seenTarget) {
      // Still seeing the unit
      seenTarget.time = Date.now();
    } else {
      // Add the unit to the perceived list
      this._perceived.push({
        target,
        time: Date.now()
      });
      this.emit(EVENT_PERCEPTION_NEW, {
        target,
      });
    }
  }
}
