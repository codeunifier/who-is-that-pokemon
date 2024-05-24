export function getRandomizedList(max, count) {
  const list = [];
  while (list.length < count) {
    const random = Math.floor(Math.random() * max);
    if (!list.includes(random)) {
      list.push(random);
    }
  }
  return list;
}
