import { Shape } from "hovl/shapes";

export interface Viewport {
  x: number;
  y: number;
  width: number;
  height: number;
  scale: number;
}

export abstract class Scene {
  public readonly context: CanvasRenderingContext2D;

  protected shapes: Shape[] = [];

  private readonly canvas: HTMLCanvasElement;
  private viewport?: Viewport;
  private aspectRatio: number;

  public get width(): number {
    return this.canvas.width;
  }

  public get height(): number {
    return this.canvas.height;
  }

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.aspectRatio = this.canvas.width / this.canvas.height;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      this.context = ctx;
    } else {
      throw new Error("No canvas found");
    }
  }

  public setCanvasSize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.aspectRatio = this.canvas.width / this.canvas.height;

    if (this.viewport) {
      this.setViewport(this.viewport.x, this.viewport.y, this.viewport.width);
    }
  }

  public setViewport(x: number, y: number, width: number) {
    const scale = this.canvas.width / width;
    const height = width / this.aspectRatio;

    this.viewport = { x, y, width, height, scale };
    this.context.setTransform(scale, 0, 0, scale, -x * scale, -y * scale);
  }

  public start(): void {
    const start = performance.now();
    let last = start;

    const frame = (now: number) => {
      const time = now - start;
      const dt = now - last;
      last = now;
      this.frame(time, dt);
      window.requestAnimationFrame(frame);
    };

    window.requestAnimationFrame(frame);
  }

  public clear(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private frame(time: number, dt: number): void {
    this.update(time / 1000, dt / 1000);
    this.render();
  }

  protected abstract update(time: number, dt: number): void;

  protected render(): void {
    this.clear();

    for (const shape of this.shapes) {
      shape.draw(this.context);
    }
  }
}
