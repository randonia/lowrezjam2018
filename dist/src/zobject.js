/**
 * Because GameObject is most likely to collide with Phaser, a "Zambini Game Object" - aka a bunch
 * of helpers - is what this guy is. It has types and layers for identifying enemies because that
 * is just fancy
 */
class ZObject extends Phaser.Events.EventEmitter {
  get collisionFlags() {
    return this._collisionFlags;
  }
  get sprite() {
    return this._sprite;
  }
  get name() {
    if (!this._name) {
      console.error('Name not defined for this ZObject:', this);
    }
    return this._name;
  }
  get x() {
    return this.sprite.x;
  }
  get y() {
    return this.sprite.y;
  }
  get hitpoints() {
    return this._hitpoints;
  }
  constructor(opts = {}) {
    super(opts);
    const {
      scene,
      x = 0,
      y = 0,
    } = opts;
    // Grant this access to the scene
    this.scene = scene;
    if (!this.scene) {
      throw new Error('Missing scene');
    }
    this.components = [];
  }
  addComponent(componentType) {
    const component = new(BaseComponent.getComponentClass(componentType))({
      controller: this,
      scene: this.scene,
    });
    component.controller = this;
    this.components.push(component);
    return component;
  }
  update() {
    this.components.forEach(component => component.update(this));
  }
  /*
   * Creates a physics sprite and also registers it and sets the dimensions of the collision.
   * Mostly a shorthand. Use PhysicsManager group IDs to select.
   */
  createPhysicsSprite(x, y, spriteId, groupId, collideW, collideH, useCollision = false) {
    const newSprite = this.scene.physics.add.sprite(x, y, spriteId);
    newSprite.body.setSize(collideW || newSprite.width, collideH || newSprite.height, newSprite.getCenter());
    PhysicsManager.register(newSprite, groupId, false, useCollision);
    newSprite._controller = this;
    return newSprite;
  }
  createSprite(x, y, spriteId, frameNum = 0, fixedPos = false) {
    const result = this.scene.add.sprite(x, y, spriteId, frameNum);
    result._controller = this;
    if (fixedPos) {
      result.setScrollFactor(0, 0);
    }
    return result;
  }
  onCollide(source, other) {}
  collidesWith(other) {
    return this.collisionFlags !== undefined && other.collisionFlags !== undefined &&
      (this.collisionFlags & other.collisionFlags) !== 0;
  }
}
