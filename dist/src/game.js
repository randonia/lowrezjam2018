if (/localhost/.test(window.location.href)) {
  console.info('ＥＮＶＩＲＯＮＭＥＮＴ: localhost');
} else {
  console.info('ＥＮＶＩＲＯＮＭＥＮＴ: release');
}

const ZOOM = PARAMS.zoom || 4;

var gameConfig = {
  type: Phaser.WEBGL,
  width: 64,
  height: 64,
  scene: new GameScene(),
  canvas: document.getElementById('game-canvas'),
  pixelArt: true,
  zoom: ZOOM,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
        x: 0,
      },
      debug: PARAMS.debugphysics,
    }
  },
}

var game = new Phaser.Game(gameConfig);

// Debugging yo
const _scene = gameConfig.scene;
