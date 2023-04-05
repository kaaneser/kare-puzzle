const Puzzle = require('./puzzle_model');

module.exports = class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(puzzlePiece) {
    const node = puzzlePiece;

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.next !== null) {
        current = current.next;
      }

      current.next = node;
    }

    this.size++;
  }

  shuffle() {
    let count = 0;
    let current = this.head;

    while (current !== null) {
      count++;
      current = current.next;
    }

    for (let i = count - 1; i > 0; i--) {
      let ith = this.head;
      let jth = this.head;

      for (let j = 0; j < i; j++) {
        ith = ith.next;
      }

      for (let j = 0; j < Math.floor(Math.random() * (i + 1)); j++) {
        jth = jth.next;
      }

      const temp = ith.data;
      ith.data = jth.data;
      jth.data = temp;
    }

    return this.head;
  }

  swapNodes(dataOne, dataTwo) {
    if (dataOne === dataTwo) return;

    console.log(dataOne);

    let nodeOne = null;
    let nodeTwo = null;
    let current = this.head;

    while (current) {
      if (current.data.pieceNum === parseInt(dataOne)) {
        nodeOne = current;
      } else if (current.data.pieceNum === parseInt(dataTwo)) {
        nodeTwo = current;
      }
      
      current = current.next;
    }

    if (!nodeOne ||!nodeTwo) return;

    let temp = nodeOne.data;
    nodeOne.data = nodeTwo.data;
    nodeTwo.data = temp;
  }

  printList() {
    let current = this.head;
    let list = '';

    while (current !== null) {
      list += `${current.picUrl} `;
      current = current.next;
    }

    return list.trim();
  }
}