var player;
var _map;
class GameScene extends BaseScene {
  preload() {
    console.info('Creating GameScene');
    this.load.spritesheet('player',
      'assets/sprites/player.png', {
        frameWidth: 8,
        frameHeight: 8
      }
    );
    this.load.image('terrain', 'assets/tilesets/terrain.png');
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/world-1-1.json');
  }
  create() {
    const map = this.make.tilemap({
      key: 'map',
    });

    _map = map;
    const tileset = map.addTilesetImage('ground', 'terrain');
    const groundLayer = map.createStaticLayer('snow_floor', tileset, 0, 0);

    player = new Player({
      x: 0,
      y: 0,
      scene: this
    });
  }
  update(time, delta) {}
}
