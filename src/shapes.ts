import { Vector } from "hovl/vector";

export interface Trs {
  translate: Vector;
  rotate: number;
  scale: Vector | number;
}

export abstract class Shape {
  public color: string;

  public translate: Vector;
  public rotate: number;
  public scale: Vector;

  constructor(
    color: string,
    { translate = Vector(0, 0), rotate = 0, scale = Vector(1, 1) }: Partial<Trs>
  ) {
    this.color = color;

    this.translate = Vector(translate);
    this.rotate = rotate;
    this.scale = Vector(scale);
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.translate.x, this.translate.y);
    context.rotate(this.rotate);
    context.scale(this.scale.x, this.scale.y);
    this.drawInternal(context);
    context.restore();
  }

  protected abstract drawInternal(context: CanvasRenderingContext2D): void;
}

export class Circle extends Shape {
  public radius: number;

  constructor(radius: number, color: string, trs: Partial<Trs>) {
    super(color, trs);
    this.radius = radius;
  }

  protected drawInternal(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
