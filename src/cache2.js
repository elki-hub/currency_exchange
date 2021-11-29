class Cache {
  cache = {};

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

  // static async getOrSetAsync(key, ifUndefined) {
  //   let cachedExchangeRate = await this.get(key);
  //   if (!cachedExchangeRate && typeof ifUndefined === 'function') {
  //     const value = addCallback();
  //     this.set(key, value);
  //     cachedExchangeRate = this.get(key);
  //     if (!cachedExchangeRate) throw new Error();
  //   }
  // }
}

exports.Cache2 = Cache;
exports.Cache = Cache;
