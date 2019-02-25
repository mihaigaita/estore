export function range(size, startAt = 0, step = 1) {
  return [...Array(size).keys()].map(i => i * step + startAt);
}

export function enumListToObject(list = []) { 
  return list.reduce((obj, element) => {
    if (typeof element === "string")
      obj[element] = element;
    return obj;
  }, Object.create(null));
}