var player;

class GameScene extends BaseScene {
  preload() {
    console.info('Creating GameScene');
    this.load.spritesheet('player',
      'assets/sprites/player.png', {
        frameWidth: 8,
        frameHeight: 8
      }
    );
  }
  create() {
    player = new Player({
      x: 0,
      y: 0,
      scene: this
    });
  }
  update() {}
  render() {}
}
