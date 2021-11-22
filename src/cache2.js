class Cache {
  constructor() {
    this.cache = {};
  }

  set(key, value) {
    this.cache[key] = value;
  }

  get(key) {
    let value = this.cache[key];
    if (!value) {
      return undefined;
    }
    return value;
  }
}

exports.Cache2 = Cache;
