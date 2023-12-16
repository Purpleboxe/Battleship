class Ship {
  constructor(length, isVertical) {
    this.length = length;
    this.isVertical = isVertical;
    this.hits = Array(length).fill(false);
    this.row = null;
    this.col = null;
  }

  setPosition(row, col) {
    this.row = row;
    this.col = col;
  }

  hit(square) {
    if (!this.hits[square]) {
      this.hits[square] = true;
      return true;
    }
    return false;
  }

  isHit(x, y) {
    if (this.isVertical) {
      return this.hits[x - this.row];
    }
    return this.hits[y - this.col];
  }

  isSunk() {
    return this.hits.every((hit) => hit);
  }
}

module.exports = Ship;
