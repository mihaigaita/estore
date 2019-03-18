export function* rangeGenerator(stop, startAt = 0, step = 1) {
  for (let i = startAt; i < stop; i += step) {
    yield i;
  }
}

export function enumListToObject(list = []) { 
  return list.reduce((obj, element) => {
    if (typeof element === "string")
      obj[element] = element;
    return obj;
  }, Object.create(null));
}