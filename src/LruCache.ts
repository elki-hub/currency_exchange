class LinkedNode {
  constructor(
    public key: string,
    public value: number,
    public next: LinkedNode = null,
    public prev: LinkedNode = null
  ) {}
}

export class LruCache {
  constructor(
    private readonly max: number,
    private size: number = 0,
    private cache: { [key: string]: LinkedNode } = {},
    private head: LinkedNode = null,
    private tail: LinkedNode = null
  ) {}

  private addElementToTheTail(node: LinkedNode) {
    if (this.tail) {
      this.tail.next = node;
    }
    node.next = null;
    node.prev = this.tail;
    this.tail = node;
    this.cache[node.key] = node;
    this.size = Object.values(this.cache).length;
  }

  set(key: string, value: number) {
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

  get(key: string) {
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
