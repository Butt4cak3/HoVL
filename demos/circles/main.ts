import { Scene } from "hovl/scene";
import { Circle } from "hovl/shapes";

class CirclesScene extends Scene {
  // TODO(gustorn): hacky workaround for testing
  shapes: Circle[];

  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.shapes = [
      new Circle(2, 2, 1, "#00FF00"),
      new Circle(8, 8, 1, "#0000FF")
    ];
  }

  protected update(time: number): void {
    this.shapes[0].center.x = 5 + Math.sin(time) * 3;
    this.shapes[1].center.y = 5 + Math.sin(time) * 3;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new CirclesScene(canvas);

  scene.setCanvasSize(600, 600);
  scene.setViewport(0, 0, 10);

  scene.start();
});
