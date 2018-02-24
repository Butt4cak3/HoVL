import { Scene } from "hovl/scene";
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
  public scaling: Vector;

  constructor(color: string, trs: Partial<Trs>) {
    this.color = color;
    this.translation = trs.translation || new Vector(0, 0);
    this.rotation = trs.rotation || 0;
    this.scaling = typeof trs.scale === "number"
      ? new Vector(trs.scale, trs.scale)
      : trs.scale || new Vector(1, 1);
  }

  public draw(scene: Scene): void {
    scene.context.save();
    scene.context.translate(this.translation.x, this.translation.y);
    scene.context.rotate(this.rotation);
    scene.context.scale(this.scaling.x, this.scaling.y);
    this.drawInternal(scene);
    scene.context.restore();
  }

  protected abstract drawInternal(scene: Scene): void;
}

export class Circle extends Shape {
  public radius: number;

  constructor(x: number, y: number, radius: number, color: string) {
    super(color, { translation: new Vector(x, y) });
    this.radius = radius;
  }

  protected drawInternal(scene: Scene): void {
    const ctx = scene.context;

    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
