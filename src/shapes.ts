import { Vector } from "hovl/vector";

interface Trs {
  translation: Vector;
  rotation: number;
  scale: Vector | number;
}

export abstract class Shape {
  public color: string;

  public translation: Vector;
  public rotation: number;
  public scale: Vector;

  constructor(
    color: string,
    {
      translation = new Vector(0, 0),
      rotation = 0,
      scale = new Vector(1, 1)
    }: Partial<Trs>
  ) {
    this.color = color;

    this.translation = translation.copy();
    this.rotation = rotation;
    this.scale =
      typeof scale === "number" ? new Vector(scale, scale) : scale.copy();
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.translation.x, this.translation.y);
    context.rotate(this.rotation);
    context.scale(this.scale.x, this.scale.y);
    this.drawInternal(context);
    context.restore();
  }

  protected abstract drawInternal(context: CanvasRenderingContext2D): void;
}

export class Circle extends Shape {
  public radius: number;

  constructor(x: number, y: number, radius: number, color: string) {
    super(color, { translation: new Vector(x, y) });
    this.radius = radius;
  }

  protected drawInternal(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}
