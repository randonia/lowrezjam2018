var player;

class GameScene extends BaseScene {
  constructor(config) {
    super(config);
  }
  preload() {
    console.info('Creating GameScene');
    this.load.spritesheet('player',
      'assets/sprites/player.png', {
        frameWidth: 8,
        frameHeight: 8
      }
    );
    this.load.spritesheet('hud', 'assets/sprites/hud.png', {
      frameWidth: 8,
      frameHeight: 8,
    });
    this.load.image('terrain', 'assets/tilesets/terrain.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/world-1-1.json');
  }
  create() {
    const map = this.make.tilemap({
      key: 'map',
    });

    const tileset = map.addTilesetImage('ground', 'terrain');
    const groundLayer = map.createStaticLayer('snow_floor', tileset, 0, 0);

    // This doesn't work for some reason so go manual. Cool.
    // groundLayer.setCollisionByProperty({
    //   collides: true
    // });
    groundLayer.setCollision(5);

    if (PARAMS.debugphysics) {
      const debugGraphics = this.add.graphics().setAlpha(0.75);
      groundLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    }

    player = new Player({
      x: 8,
      y: 8,
      scene: this
    });

    this.addObject(player);
    this.physics.add.collider(player.sprite, groundLayer);

  }
  update(time, delta) {
    super.update(time, delta);
  }
}
