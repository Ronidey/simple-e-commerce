/* eslint-disable prefer-const */

export default function clsx(...args: unknown[]) {
  let i = 0,
    temp: unknown,
    str = "",
    len = args.length;

  for (; i < len; i++) {
    temp = args[i];

    if (temp && typeof temp === "string") {
      str += (str && " ") + temp;
    }
  }
  return str;
}
