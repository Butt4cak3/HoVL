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
    public canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    public viewport: Viewport;
    private aspectRatio: number;

    constructor(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      let ctx = canvas.getContext("2d");
      if (ctx) {
        this.ctx = ctx;
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
    public toCanvasSpace(vec: any) {
      if (vec instanceof Vector) {
        const { x, y, scale } = this.viewport;

        return {
          x: (vec.x - x) * scale,
          y: (vec.y - y) * scale
        };
      } else if (typeof vec === "number") {
        return vec * this.viewport.scale;
      }
    }

    public getContext(): CanvasRenderingContext2D {
      return this.ctx;
    }
  }
}
