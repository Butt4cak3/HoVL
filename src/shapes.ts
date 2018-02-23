import { Scene } from "hovl/scene";
import { Vector } from "hovl/vector";

export abstract class Shape {
  public pos: Vector;
  public color: string;

  constructor(x: number, y: number, color: string) {
    this.pos = new Vector(x, y);
    this.color = color;
  }

  public abstract draw(scene: Scene): void;
}

export class Circle extends Shape {
  public radius: number;

  constructor(x: number, y: number, radius: number, color: string) {
    super(x, y, color);
    this.radius = radius;
  }

  public draw(scene: Scene): void {
    const { x, y } = scene.toCanvasSpace(this.pos);
    const radius = scene.toCanvasSpace(this.radius);
    const ctx = scene.context;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
