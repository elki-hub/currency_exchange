class LruCache {
  constructor(max) {
    this.max = max;
    this.size = 0;
    this.cache = {};
  }

  makeRecentlyUsed(key, value) {
    let tempCache = Object.entries(this.cache);
    const newCache = {};
    let max = this.max - 1;

    newCache[key] = value;

    for (let i = 0; i < this.size && i < max; i++) {
      let entity = tempCache[i]; // [ 'A', 13 ]

      if (entity[0] !== key) {
        newCache[entity[0]] = entity[1];
      } else {
        max++;
      }
    }

    return newCache;
  }

  set(key, value) {
    if (key !== Object.keys(this.cache)[0] && this.size !== 0) {
      this.cache = this.makeRecentlyUsed(key, value);
    } else {
      this.cache[key] = value;
    }
    this.size = Object.keys(this.cache).length;
  }

  get(key) {
    const value = this.cache[key];
    if (value) {
      this.cache = this.makeRecentlyUsed(key, value);
    }

    return value;
  }
}

exports.LruCache = LruCache;
