export const groupByFx = (fx: Function) =>
(
  previous: Map<string, Array<unknown>>,
  current: unknown,
) => {
  const grp = fx(current);
  if (!previous.has(grp)) {
    previous.set(grp, [current]);
  } else {
    previous.set(grp, [...previous.get(grp) ?? [], current]);
  }
  return previous;
};

console.debug("@todo Check groupIntoMap signature");
export const groupIntoMap = (arr: Array<unknown>, fx: Function) =>
  arr.reduce(groupByFx(fx), new Map());

//https://www.30secondsofcode.org/js/s/shuffle/
export const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};
