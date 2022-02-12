export default function parseID(
  n: number | string[] | string | undefined
): number {
  if (typeof n === "number") {
    return n;
  }
  if (n === undefined) {
    return -1;
  }
  const result: number = Number.parseInt(Array.isArray(n) ? n[0] : n);
  return result.toString() === n ? result : -1;
}
