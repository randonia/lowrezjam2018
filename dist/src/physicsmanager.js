const PHYS_LAYERS = {
  NONE: 0,
  PLAYER: 1,
  ENEMY: 2,
  PERCEPTION: 4,
}

const PHYS_GROUPS = {
  TERRAIN: 1000, // ?
  PLAYER: 1001,
  ENEMY: 1002,
  PERCEPTION: 1003,
};

/**
 * For complex layers and physics interactions, use functions here to make things work.
 */
class _PhysicsManager {
  constructor() {
    this._groups = {};
    this._terrain = [];
  }
  // Tell this PM to manage the scene
  manageScene(scene) {
    if (this._scene) {
      console.warn('Instructed PhysicsManager to handle scene when it already was set!');
    }
    this._scene = scene;
    scene.physics.world.on('COLLIDE_EVENT', (event) => console.log('Collision event:', event));
  }
  register(object, groupId, ignoreTerrain = false) {
    if (groupId === PHYS_GROUPS.TERRAIN) {
      this._terrain.push(object);
      return;
    }
    if (!this._groups[groupId]) {
      // this._groups[groupId] = new Phaser.Physics.Arcade.Group();
      const newGroup = this._scene.physics.add.group();

      Object.keys(this._groups).forEach(groupId => this._scene.physics.add.overlap(newGroup, this._groups[groupId], this.onOverlap, this.shouldOverlap, this));

      this._groups[groupId] = newGroup;
      // make this group collide with terrain
      if (!ignoreTerrain && groupId !== PHYS_GROUPS.TERRAIN) {
        this._terrain.forEach(terrainLayer => this._scene.physics.add.collider(object, terrainLayer));
      }
    }
    this._groups[groupId].add(object);
  }
  deRegister(object, groupId) {

  }
  blockCollide(left, right) {
    this._scene.physics
  }
  onOverlap(source, target) {
    let src;
    let tgt;
    if (source._component) {
      src = source._component;
    } else if (source._controller) {
      src = source._controller;
    } else {
      src = source;
    }
    if (target._component) {
      tgt = target._component;
    } else if (target._controller) {
      tgt = target._controller;
    } else {
      tgt = target;
    }
    if (PARAMS.debugcollisions) {
      console.log(sprintf('%s collided with %s', src.name, tgt.name));
    }
    src.onCollide(tgt);
    tgt.onCollide(src);
  }
  shouldOverlap(source, target) {
    const sourceController = source._controller;
    const targetController = target._controller;
    if ((!sourceController || !targetController) ||
      (sourceController === targetController)) {
      return false;
    }

    return this.testCollision(sourceController, targetController);
  }
  // Assumes that they are controllers and nothing else!
  testCollision(source, target) {
    return source.collidesWith(target);
  }
}

// Singleton I guess lmao
const PhysicsManager = new _PhysicsManager();
