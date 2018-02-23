document.addEventListener("DOMContentLoaded", () => {
  const Circle = Shapes.Circle;

  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new Scene.Scene(canvas);

  scene.setCanvasSize(600, 600);
  scene.setViewport(0, 0, 10);

  const balls: Shapes.Circle[] = [
    new Circle(2, 2, 1, '#00FF00'),
    new Circle(8, 8, 1, '#0000FF'),
  ];

  const frame = function frame() {
    scene.getContext().clearRect(0, 0, canvas.width, canvas.height);

    for (let ball of balls) {
      ball.draw(scene);
    }

    window.requestAnimationFrame(frame);
  };

  window.requestAnimationFrame(frame);
});

