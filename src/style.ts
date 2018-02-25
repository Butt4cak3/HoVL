import { mergeWithoutUndefined } from "hovl/util";

export const mergeStyles = mergeWithoutUndefined;

export interface StrokeStyle {
  strokeWidth: number;
  strokeColor: string;
}

export interface FillStyle {
  fillColor: string;
}

export const defaultStrokeStyle: StrokeStyle = {
  strokeWidth: 1,
  strokeColor: "#000000"
};

export const defaultFillStyle: FillStyle = {
  fillColor: "transparent"
};
