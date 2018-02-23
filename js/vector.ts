class Vector {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public copy(): Vector {
    return new Vector(this.x, this.y);
  }

  public add(x: number, y: number): Vector;
  public add(vec: Vector, y: undefined): Vector;
  public add(x: any, y: any) {
    if (x instanceof Vector) {
      this.x += x.x;
      this.y += y.y;
    } else {
      this.x += x;
      this.y += y;
    }
    return this;
  }

  public sub(x: number, y: number): Vector;
  public sub(vec: Vector, y: undefined): Vector;
  public sub(x: any, y: any) {
    if (x instanceof Vector) {
      this.x -= x.x;
      this.y -= y.y;
    } else {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }

  public mult(scale: number): Vector {
    this.x *= scale;
    this.y *= scale;
    return this;
  }
}
