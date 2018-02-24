import { Scene } from "hovl/scene";
import { Circle } from "hovl/shapes";

class CirclesScene extends Scene {
  public constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.shapes = [
      new Circle(2, 2, 1, "#00FF00"),
      new Circle(8, 8, 1, "#0000FF")
    ];
  }

  protected update(time: number): void {
    // Setting the translation is relative to the shape's original position
    // You could also set the circle's center but we don't know the shape's
    // type at this point
    this.shapes[0].translation.x = 3 + Math.sin(time) * 3;
    this.shapes[1].translation.y = -3 + Math.sin(time) * 3;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new CirclesScene(canvas);

  scene.setCanvasSize(600, 600);
  scene.setViewport(0, 0, 10);

  scene.start();
});
