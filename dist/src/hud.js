const FRAME_HEART_EMPTY = 14;
const FRAME_HEART_HALF = 13;
const FRAME_HEART_FULL = 12;

class HUD extends ZObject {
  constructor(opts) {
    super(opts);
    const {
      scene
    } = opts;
    this._hitpointMax = undefined;
    this._hitpointbar = [];
  }
  bindToPlayer(player) {
    this._player = player;
    this.setHP(player.hitpoints);
    player.on('hp', ({
      hitpoints
    }) => this.setHP(hitpoints));
  }
  setHP(hp) {
    if (!this._hitpointMax) {
      this._hitpointMax = hp;
      // create the sprites
      const startX = 5;
      const startY = 5;
      const spacerX = 9;
      const spacerY = 0;
      for (var curIdx = 0; curIdx < hp; curIdx++) {
        const newX = startX + spacerX * curIdx;
        const newY = startY + spacerY * curIdx;
        this._hitpointbar.push(this.createSprite(newX, newY, 'hud', FRAME_HEART_FULL));
      }
    }
    for (var hpIdx = 0; hpIdx < this._hitpointbar.length; hpIdx++) {
      const heart = this._hitpointbar[hpIdx];
      let spriteFrame;
      // Handle half HPs
      if (Number.isInteger(hp)) {
        spriteFrame = (hpIdx < hp) ? FRAME_HEART_FULL : FRAME_HEART_EMPTY;
      } else {
        spriteFrame = (hpIdx < hp) ? (((hpIdx + 1) < hp) ? FRAME_HEART_FULL : FRAME_HEART_HALF) : FRAME_HEART_EMPTY;
      }
      heart.setFrame(spriteFrame);
    }
  }
}
