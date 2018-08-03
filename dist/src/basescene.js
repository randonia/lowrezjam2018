class BaseScene extends Phaser.Scene {
  /**
    * Object must have the following APIs:
      update(time, delta)
      destroy()
    */
  addObject(object) {
    this._gameObjects.push(object);
  }
  deleteObject(object) {
    log.warn('TODO: deleteObject not implemented');
    throw new Error('Not Implemented yet');
  }
  preload() {
    throw Error('Not Implemented');
  }
  init() {
    // Phaser 3 now defines scaling in the base config using pixelArt: true & zoom: INTEGER,
    this._gameObjects = [];
  }
  create() {
    throw Error('Not Implemented');
  }
  update() {
    this._gameObjects.forEach(go => go.update());
  }
  render() {
    throw Error('Not Implemented');
  }
}
