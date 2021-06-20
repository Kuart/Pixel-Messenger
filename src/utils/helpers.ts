export const generateUniqId = () =>
  (Number(Date.now().toString().substring(10, 13)) * (Math.random() * (99 - 1) + 1)).toFixed(0);
