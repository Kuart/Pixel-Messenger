export const generateUniqId = () =>
  (Number(Date.now().toString().substring(10, 13)) * (Math.random() * (200 - 1) + 1)).toFixed(0);
