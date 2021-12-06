class LruCache {
  constructor(max) {
    this.max = max;
    this.size = 0;
    this.cache = {};
  }

  makeRecentlyUsed(key, value) {
    let cacheKeys = Object.keys(this.cache);
    let max = 0;

    for (let i = this.size - 1; i >= 0; i--) {
      let currentKey = cacheKeys[i];
      max++;

      if (currentKey === key) {
        delete this.cache[currentKey];
        break;
      }
      if (max === this.max) {
        delete this.cache[currentKey];
      }
    }
    this.cache[key] = value;
  }

  set(key, value) {
    if (Object.keys(this.cache)[this.size - 1] !== key && this.size !== 0) {
      this.makeRecentlyUsed(key, value);
    } else if (this.size === 0) {
      this.cache[key] = value;
    }

    this.size = Object.keys(this.cache).length;
  }

  get(key) {
    const value = this.cache[key];
    if (value && Object.keys(this.cache)[this.size - 1] !== key) {
      this.makeRecentlyUsed(key, value);
    }
    return value;
  }
}

exports.LruCache = LruCache;
