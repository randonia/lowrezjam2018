const PLAYER_SPEED = 5;

class Player {
  get sprite() {
    return this._sprite;
  }
  constructor(opts = {}) {
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
    this._sprite = scene.physics.add.sprite(x, y, 'player');
    this._initControls(scene);
  }
  _initControls(scene) {
    // Player Keybinds
    this.keys = {
      UP: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      LEFT: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      DOWN: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      RIGHT: scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    };
  }
  update() {
    this._handleInput();
  }
  _handleInput() {
    let dX = 0;
    dX += (this.keys.LEFT.isDown) ? -PLAYER_SPEED : 0;
    dX += (this.keys.RIGHT.isDown) ? PLAYER_SPEED : 0;
    let dY = 0;
    dY += (this.keys.UP.isDown) ? -PLAYER_SPEED : 0;
    dY += (this.keys.DOWN.isDown) ? PLAYER_SPEED : 0;


    this.sprite.body.setVelocityX(dX);
    this.sprite.body.setVelocityY(dY);
  }
}
