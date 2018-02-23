namespace Shapes {
  type Point = Scene.Point;

  export abstract class Shape {
    public pos: Vector;
    public color: string;

    constructor(x: number, y: number) {
      this.pos = new Vector(x, y);
    }

    public abstract draw(scene: Scene.Scene): void;
  }

  export class Circle extends Shape {
    public radius: number;

    constructor(x: number, y: number, radius: number, color: string) {
      super(x, y);
      this.radius = radius;
      this.color = color;
    }

    public draw(scene: Scene.Scene): void {
      const { x, y } = scene.toCanvasSpace(this.pos);
      const radius = scene.toCanvasSpace(this.radius);
      const ctx = scene.getContext();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
}
