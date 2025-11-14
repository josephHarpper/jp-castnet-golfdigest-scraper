export class RequestQueue {
  constructor() {
    this.queue = [];
    this.visited = new Set();
  }

  add(url) {
    if (!this.visited.has(url)) {
      this.queue.push(url);
      this.visited.add(url);
    }
  }

  next() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}