export interface Vector {
  x: number;
  y: number;
}

export function Vector(value: Vector | number): Vector;
export function Vector(x: number, y: number): Vector;
export function Vector(x: number | Vector, y?: number): Vector {
  if (typeof x === "number") {
    return { x, y: y != null ? y : x };
  } else {
    return { ...x };
  }
}

export function dot(lhs: Vector, rhs: Vector): number {
  return lhs.x * rhs.x + lhs.y * rhs.y;
}

export function length(v: Vector): number {
  return Math.sqrt(dot(v, v));
}

export function add(lhs: Vector, rhs: Vector): Vector {
  return { x: lhs.x + rhs.x, y: lhs.y + rhs.y };
}

export function sub(lhs: Vector, rhs: Vector): Vector {
  return { x: lhs.x - rhs.x, y: lhs.y - rhs.y };
}

export function mul(lhs: Vector, rhs: number): Vector {
  return { x: lhs.x * rhs, y: lhs.y * rhs };
}

export function div(lhs: Vector, rhs: number): Vector {
  return { x: lhs.x / rhs, y: lhs.y / rhs };
}
