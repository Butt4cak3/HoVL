import { Scene } from "hovl/scene";
import { Circle } from "hovl/shapes";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new Scene(canvas);

  scene.setCanvasSize(600, 600);
  scene.setViewport(0, 0, 10);

  const balls: Circle[] = [
    new Circle(2, 2, 1, "#00FF00"),
    new Circle(8, 8, 1, "#0000FF")
  ];

  const frame = () => {
    scene.context.clearRect(0, 0, scene.width, scene.height);

    for (const ball of balls) {
      ball.draw(scene);
    }

    window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame(frame);
});
