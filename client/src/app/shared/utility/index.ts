let typeCache: { [label: string]: boolean } = {};
/**
 *  Function to check if that action is in use
 * @param label Action Label
 */
export function type<T>(label: T | ""): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}
