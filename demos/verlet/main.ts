import { Scene } from "hovl/scene";
import { Line, Circle } from "hovl/shapes";
import { Vector, add } from "hovl/vector";

const BOX_X = 1;
const BOX_Y = 1;
const BOX_WIDTH = 10;
const BOX_HEIGHT = 10;
const GRAVITY = 9.81;

// Velocity Verlet
function verletPos(x: number, v: number, a: number, dt: number): number {
  return x + v * dt + 0.5 * a * dt * dt;
}

function verletVel(v: number, a: number, dt: number): number {
  return v + a * dt;
}

// We need a circle that knows its velocity and bounciness
class Ball extends Circle {
  public vel: Vector = Vector(0, 0);
  public bounciness = 0.8;
}

class VerletScene extends Scene {
  private ball: Ball;

  constructor(canvas: HTMLCanvasElement) {
    super(canvas);

    // These lines create a bounding box that the ball will bounce off of
    this.shapes.push(
      new Line(Vector(0, 0), Vector(BOX_WIDTH, 0), 0.1, "#000000", {
        translate: Vector(BOX_X, BOX_Y)
      }),
      new Line(Vector(0, 0), Vector(BOX_WIDTH, 0), 0.1, "#000000", {
        translate: Vector(BOX_X, BOX_Y + BOX_HEIGHT)
      }),
      new Line(Vector(0, 0), Vector(0, BOX_HEIGHT), 0.1, "#000000", {
        translate: Vector(BOX_X, BOX_Y)
      }),
      new Line(Vector(0, 0), Vector(0, BOX_HEIGHT), 0.1, "#000000", {
        translate: Vector(BOX_X + BOX_WIDTH, BOX_Y)
      })
    );

    // Create a ball a bit above the center of the box
    this.ball = new Ball(0.5, "#00AA77", {
      translate: Vector(BOX_X + (BOX_WIDTH / 2), BOX_Y + 2)
    });

    // Give it a random starting velocity
    this.ball.vel = add(this.ball.vel, Vector(Math.random() * 40 - 20, Math.random() * 40 - 20));

    // Add the ball to the shapes so that it gets drawn
    this.shapes.push(this.ball);
  }

  protected update(_: number, dt: number): void {
    const ball = this.ball;

    // Calculate the new position
    ball.translate.x = verletPos(ball.translate.x, ball.vel.x, 0, dt);
    ball.translate.y = verletPos(ball.translate.y, ball.vel.y, GRAVITY, dt);

    // Calculate the new velocity
    ball.vel.x = verletVel(ball.vel.x, 0, dt);
    ball.vel.y = verletVel(ball.vel.y, GRAVITY, dt);

    // These are the coordinates at which the ball hits a wall
    const boundTop = BOX_Y + ball.radius;
    const boundBottom = BOX_Y + BOX_HEIGHT - ball.radius;
    const boundLeft = BOX_X + ball.radius;
    const boundRight = BOX_X + BOX_WIDTH - ball.radius;

    // Check for and resolve collisions
    if (ball.translate.y > boundBottom) {
      ball.translate.y = boundBottom;
      ball.vel.y *= -ball.bounciness;
    } else if (ball.translate.y < boundTop) {
      ball.translate.y = boundTop;
      ball.vel.y *= -ball.bounciness;
    }

    if (ball.translate.x > boundRight) {
      ball.translate.x = boundRight;
      ball.vel.x *= -ball.bounciness;
    } else if (ball.translate.x < boundLeft) {
      ball.translate.x = boundLeft;
      ball.vel.x *= -ball.bounciness;
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
