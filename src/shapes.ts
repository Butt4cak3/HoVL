import { Scene } from "hovl/scene";
import { Vector } from "hovl/vector";

interface Trs {
  translation: Vector;
  rotation: number;
  scale: Vector | number;
}

export abstract class Shape {
  public color: string;

  protected translation: Vector;
  protected rotation: number;
  protected scale: Vector;

  constructor(color: string, trs: Partial<Trs>) {
    this.color = color;
    this.translation = trs.translation || new Vector(0, 0);
    this.rotation = trs.rotation || 0;
    this.scale = typeof trs.scale === "number"
      ? new Vector(trs.scale, trs.scale)
      : trs.scale || new Vector(1, 1);
  }

  public draw(scene: Scene): void {
    scene.context.save();
    scene.context.translate(this.translation.x, this.translation.y);
    scene.context.rotate(this.rotation);
    scene.context.scale(this.scale.x, this.scale.y);
    this.drawInternal(scene);
    scene.context.restore();
  }

  protected abstract drawInternal(scene: Scene): void;
}

export class Circle extends Shape {
  public get center() {
    return this.translation;
  }

  public get radius() {
    return this.scale.x;
  }

  public set radius(value: number) {
    this.scale = new Vector(value, value);
  }

  constructor(x: number, y: number, radius: number, color: string) {
    super(color, { translation: new Vector(x, y), scale: radius });
  }

  protected drawInternal(scene: Scene): void {
    const ctx = scene.context;

    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
