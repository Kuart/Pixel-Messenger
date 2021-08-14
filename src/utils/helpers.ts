const generateUniqId = () =>
  (Number(Date.now().toString().substring(10, 13)) * (Math.random() * (200 - 1) + 1)).toFixed(0);

/* eslint no-bitwise: ["off"] */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export { uuid, generateUniqId };
