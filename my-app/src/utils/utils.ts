export const getRandom = () => {
  return Math.random();
}

export const getRandomNum = (min: number, max: number) => {
  return Math.random() * (max - min) + min;

}

export const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}