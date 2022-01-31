class LinkedNode {
  constructor(
    public key: string,
    public value: number,
    public next?: LinkedNode,
    public prev?: LinkedNode
  ) {}
}

export class LruCache {
  constructor(
    private max: number,
    private size?: number,
    private head?: LinkedNode,
    private tail?: LinkedNode,
    private cache?: {}
  ) {}

  private addElementToTheTail(node) {
    if (this.tail) {
      this.tail.next = node;
    }
    node.next = null;
    node.prev = this.tail;
    this.tail = node;
    this.cache[node.key] = node;
    this.size = Object.values(this.cache).length;
  }

  set(key, value) {
    let node = new LinkedNode(key, value);

    //if the list is empty
    if (this.size === 0) {
      this.head = node;
    }

    // if the list is full removes first element from the list (head)
    else if (this.size === this.max) {
      delete this.cache[this.head.key];
      this.head = this.head.next;
      this.head.prev = null;
    }

    //adds new element to the tail
    this.addElementToTheTail(node);
  }

  get(key) {
    const node = this.cache[key];
    if (!node) {
      return undefined;
    }

    // if element exist, make recently used
    if (node && this.tail !== node) {
      if (node.prev && this.head !== node) {
        this.cache[node.prev.key].next = node.next;
        this.cache[node.next.key].prev = node.prev;
      } else {
        this.cache[node.next.key].prev = null;
        this.head = node.next;
      }
      delete this.cache[node.key];
      this.addElementToTheTail(node);
    }

    return node.value;
  }
}
