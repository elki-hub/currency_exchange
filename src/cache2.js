class Cache {
  static cache = {};

  static set(key, value) {
    this.cache[key] = value;
  }

  static get(key) {
    let value = this.cache[key];
    if (!value) {
      return undefined;
    }
    return value;
  }
}

exports.Cache2 = Cache;
exports.Cache = Cache;
