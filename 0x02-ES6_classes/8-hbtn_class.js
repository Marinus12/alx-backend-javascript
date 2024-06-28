export default class HolbertonClass {
  constructor(size, location) {
    this._size = size;
    this._location = location;
  }

  // Casting to Number
  valueOf() {
    return this._size;
  }

  // Casting to String
  toString() {
    return this._location;
  }
}
