class Ship {
    constructor (length, isVertical) {
        this.length = length;
        this.isVertical = isVertical;
        this.hits = Array(length).fill(false);
        this.row = null;
        this.col = null;
    }

    setPosition (row, col) {
        this.row = row;
        this.col = col;
    }

    hit (square) {
        if (!this.hits[square]) {
            this.hits[square] = true;
            return true;
        } else {
            return false;
        }
    }

    isHit (index) {
        return this.hits[index] === true;
    }

    isSunk () {
        return this.hits.every(hit => hit);
    }
}

module.exports = Ship;