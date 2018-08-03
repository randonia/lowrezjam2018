const PLAYER_SPEED = 15;
const PLAYER_MAX_SPEED_SCALAR = PLAYER_SPEED / Math.sqrt(Math.pow(PLAYER_SPEED, 2) + Math.pow(PLAYER_SPEED, 2));

class Player {
  get sprite() {
    return this._sprite;
  }
  get x() {
    return this.sprite.x;
  }
  get y() {
    return this.sprite.y;
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
    this._sprite.body.setSize(4, 7, this._sprite.getCenter());
    this._crosshair = scene.add.sprite(x, y, 'hud', 0);
    this._gfx = scene.add.graphics();
    this._initControls();
  }
  _initControls() {
    // Player Keybinds
    this.keys = {
      UP: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      LEFT: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      DOWN: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      RIGHT: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      Q: this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q),
    };

    // Lock the mouse pointer? keep this in here I guess
    // game.canvas.addEventListener('mousedown', function() {
    //   game.input.mouse.requestPointerLock();
    // });

    this.scene.input.on('pointermove', (pointer) => {
      this._moveCrosshair(pointer);
    }, this);
  }
  update() {
    this._handleKeyPresses();
  }
  _moveCrosshair(pointer) {
    const {
      x: pointX,
      y: pointY,
    } = pointer.position;
    this._crosshair.setPosition(pointX, pointY);
    this._gfx.clear();
    this._gfx.lineStyle(1, 0x2ECC4011, 0.12);

    this._gfx.beginPath();
    this._gfx.moveTo(this.x, this.y);
    this._gfx.lineTo(pointX, pointY);
    this._gfx.closePath();
    this._gfx.strokePath();

  }
  _handleKeyPresses() {
    // Handle movement
    let dX = 0;
    dX += (this.keys.LEFT.isDown) ? -PLAYER_SPEED : 0;
    dX += (this.keys.RIGHT.isDown) ? PLAYER_SPEED : 0;
    let dY = 0;
    dY += (this.keys.UP.isDown) ? -PLAYER_SPEED : 0;
    dY += (this.keys.DOWN.isDown) ? PLAYER_SPEED : 0;

    // Ensure a player max speed
    if ((Math.abs(dX) + Math.abs(dY)) > PLAYER_SPEED) {
      dX *= PLAYER_MAX_SPEED_SCALAR;
      dY *= PLAYER_MAX_SPEED_SCALAR;
    }

    this.sprite.body.setVelocityX(dX);
    this.sprite.body.setVelocityY(dY);
  }
}
