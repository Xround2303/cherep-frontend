export function isObject(a: unknown): a is object {
  return a !== null && typeof a === "object";
}

export function isArray<T = unknown>(a: unknown): a is Array<T> {
  return Array.isArray(a);
}

export function hasProperty<Self, T extends number | string | symbol>(
  obj: Self,
  property: T,
): obj is Self & { [key in T]: unknown } {
  return (isObject(obj) || isArray(obj)) && Object.hasOwn(obj, property);
}
