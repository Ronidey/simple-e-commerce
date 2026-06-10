import type { CSSProperties } from "react";
import clsx from "../../lib/clsx";

type Props = {
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  className?: string;
};

export default function Skeleton({ width, height, className }: Props) {
  return (
    <div
      className={clsx("bg-gray-300 animate-pulse rounded", className)}
      style={{ width, height }}
    />
  );
}
