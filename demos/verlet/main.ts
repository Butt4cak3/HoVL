import { Scene } from "hovl/scene";
import { Line, Circle } from "hovl/shapes";
import { Vector } from "hovl/vector";

const BOX_X = 1;
const BOX_Y = 1;
const BOX_WIDTH = 10;
const BOX_HEIGHT = 10;
const GRAVITY = 9.81;

function verletPos(x: number, v: number, a: number, dt: number): number {
  return x + v * dt + 0.5 * a * dt * dt;
}

function verletVel(v: number, a: number, dt: number): number {
  return v + a * dt;
}

class Ball extends Circle {
  public vel: Vector = Vector(0, 0);
  public bounciness = 0.8;
}

class VerletScene extends Scene {
  private ball: Ball;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    this.shapes.push(
      new Line(Vector(0, 0), Vector(BOX_WIDTH, 0), 0.1, "#000000", {
        translate: Vector(BOX_X, BOX_Y + BOX_HEIGHT)
      })
    );

    this.ball = new Ball(0.5, "#00AA77", {
      translate: Vector(BOX_X + (BOX_WIDTH / 2), BOX_Y + 2)
    });

    this.shapes.push(this.ball);
  }

  protected update(_: number, dt: number): void {
    const ball = this.ball;

    ball.translate.x = verletPos(ball.translate.x, ball.vel.x, 0, dt);
    ball.translate.y = verletPos(ball.translate.y, ball.vel.y, GRAVITY, dt);

    ball.vel.x = verletVel(ball.vel.x, 0, dt);
    ball.vel.y = verletVel(ball.vel.y, GRAVITY, dt);

    if (ball.translate.y > BOX_Y + BOX_HEIGHT - ball.radius) {
      ball.translate.y = BOX_Y + BOX_HEIGHT - ball.radius;
      ball.vel.y *= -ball.bounciness;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const scene = new VerletScene(canvas);

  scene.setCanvasSize(600, 600);
  scene.setViewport(BOX_X - 1, BOX_Y - 1, BOX_WIDTH + 2);

  scene.start();
});
