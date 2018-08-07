const COMPONENT_TYPES = {
  Perception: 'perception',
};

class BaseComponent {
  get controller() {
    return this._controller;
  }
  constructor(opts) {
    const {
      controller,
      scene,
    } = opts;

    if (!controller) {
      throw new Error('Missing controller from init opts');
    }
    if (!scene) {
      throw new Error('Missing scene from init opts');
    }

    this._controller = controller;
    this._scene = scene;
  }
  update() {
    throw new Error('Abstract Method');
  }

  static getComponentClass(type) {
    switch (type) {
      case COMPONENT_TYPES.Perception:
        return PerceptionCompoent;
      default:
        throw new Error('InvalidComponent');
    }
  }
}
