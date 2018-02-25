import {
  StrokeStyle,
  FillStyle,
  defaultStrokeStyle,
  defaultFillStyle,
  mergeStyles
} from "hovl/style";
import { Vector } from "hovl/vector";

export interface Trs {
  translate: Vector;
  rotate: number;
  scale: Vector | number;
}

export abstract class Shape {
  public translate: Vector;
  public rotate: number;
  public scale: Vector;

  public style = {};

  constructor({
    translate = Vector(0, 0),
    rotate = 0,
    scale = Vector(1, 1)
  }: Partial<Trs>) {
    this.translate = Vector(translate);
    this.rotate = rotate;
    this.scale = Vector(scale);
  }

  public setStyle(style: Partial<this["style"]>): this {
    this.style = mergeStyles(this.style, style);
    return this;
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
  public style: StrokeStyle & FillStyle = {
    ...defaultStrokeStyle,
    ...defaultFillStyle,
    strokeWidth: 0
  };

  constructor(radius: number, trs: Partial<Trs>) {
    super(trs);
    this.radius = radius;
  }

  protected drawInternal(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);

    if (this.style.strokeWidth) {
      context.strokeStyle = this.style.strokeColor;
      context.lineWidth = this.style.strokeWidth;
      context.stroke();
    }

    context.fillStyle = this.style.fillColor;
    context.fill();
  }
}

export class Line extends Shape {
  public a: Vector;
  public b: Vector;

  public style: StrokeStyle = { ...defaultStrokeStyle };

  constructor(a: Vector, b: Vector, trs: Partial<Trs>) {
    super(trs);
    this.a = Vector(a);
    this.b = Vector(b);
  }

  protected drawInternal(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.strokeStyle = this.style.strokeColor;
    context.lineWidth = this.style.strokeWidth;
    context.moveTo(this.a.x, this.a.y);
    context.lineTo(this.b.x, this.b.y);
    context.stroke();
  }
}
