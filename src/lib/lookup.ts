// Lookup of the closest lower value in an object by a key
// E.g. lookup(100, { 50: "Hello", 200: "World" }) => "Hello"

export default function lookup<T>(
  value: number,
  object: { [key: number]: T }
): T {
  let closest = -Infinity;
  let closestValue = object[closest];
  for (const key in object) {
    const numberKey = Number(key);
    if (numberKey <= value && numberKey > closest) {
      closest = numberKey;
      closestValue = object[closest];
    }
  }
  return closestValue;
}
