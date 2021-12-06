class LruCache {
  constructor(max) {
    this.max = max;
    this.size = 0;
    this.cache = {};
  }

  #makeRecentlyUsed(key, value) {
    delete this.cache[key];

    if (Object.values(this.cache).length === this.max) {
      delete this.cache[Object.keys(this.cache)[0]];
    }

    this.cache[key] = value;
  }

  set(key, value) {
    if (this.getLatestKey !== key && this.size > 0) {
      this.#makeRecentlyUsed(key, value);
    } else if (this.size === 0) {
      this.cache[key] = value;
    }

    this.size = Object.values(this.cache).length;
  }

  get(key) {
    const value = this.cache[key];
    if (value && this.getLatestKey !== key) {
      this.#makeRecentlyUsed(key, value);
    }
    return value;
  }

  getLatestKey() {
    return Object.keys(this.cache)[this.size - 1];
  }
}

exports.LruCache = LruCache;
