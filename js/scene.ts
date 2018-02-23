namespace Scene {
  export interface Viewport {
    x: number;
    y: number;
    w: number;
    h: number;
    scale: number;
  }

  export interface Point {
    x: number;
    y: number;
  }

  export class Scene {
    public readonly context: CanvasRenderingContext2D;

    private readonly canvas: HTMLCanvasElement;
    private viewport?: Viewport;
    private aspectRatio: number;

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.aspectRatio = this.canvas.width / this.canvas.height;

      let ctx = canvas.getContext("2d");
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
    }

    public setViewport(x: number, y: number, width: number) {
      let scale = this.canvas.width / width;
      let height = width / this.aspectRatio;

      this.viewport = {
        x,
        y,
        w: width,
        h: height,
        scale: scale
      };
    }

    public toCanvasSpace(len: number): number;
    public toCanvasSpace(vec: Vector): Point;
    public toCanvasSpace(vec: Vector | number) {
      if (!this.viewport) {
        throw new Error("Please set the viewport first");
      }

      if (vec instanceof Vector) {
        const { x, y, scale } = this.viewport;

        return {
          x: (vec.x - x) * scale,
          y: (vec.y - y) * scale
        };
      } else {
        return vec * this.viewport.scale;
      }
    }
  }
}
