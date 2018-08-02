class BaseScene extends Phaser.Scene {
  preload() {
    throw Error('Not Implemented');
  }
  init() {
    // Phaser 3 now defines scaling in the base config using pixelArt: true & zoom: INTEGER,
  }
  create() {
    throw Error('Not Implemented');
  }
  update() {
    throw Error('Not Implemented');
  }
  render() {
    throw Error('Not Implemented');
  }
}
