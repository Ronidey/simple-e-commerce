import type { HTMLAttributes } from "react";
import clsx from "../../../lib/clsx";

type Props = HTMLAttributes<HTMLDivElement>;

export default function Container({ children, className, ...rest }: Props) {
  return (
    <div className={clsx("px-6", className)} {...rest}>
      {children}
    </div>
  );
}
