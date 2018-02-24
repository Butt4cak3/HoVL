export class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public copy(): Vector {
    return new Vector(this.x, this.y);
  }

  public add(x: number, y: number): this;
  public add(vec: Vector): this;
  public add(x: Vector | number, y?: number) {
    if (x instanceof Vector) {
      this.x += x.x;
      this.y += x.y;
    } else {
      this.x += x;
      this.y += y!;
    }
    return this;
  }

  public sub(x: number, y: number): this;
  public sub(vec: Vector): this;
  public sub(x: Vector | number, y?: number) {
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= x.y;
    } else {
      this.x -= x;
      this.y -= y!;
    }
    return this;
  }

  public mult(scale: number): this {
    this.x *= scale;
    this.y *= scale;
    return this;
  }
}
