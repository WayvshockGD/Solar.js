class Collection extends Map {

  /**
   * @param {string|string[]|object|Class} value The value.
   */
  constructor(value) {
    this.value = value;
  }
}

module.exports = Collection;