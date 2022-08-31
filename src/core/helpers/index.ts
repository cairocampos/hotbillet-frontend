export const generateId = function () {
  return Date.now().toString(32).substr(4) + '_' + Math.random().toString(36).substr(2, 9);
};

export const debounce = (fn: () => any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: []) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

let timeoutId = setTimeout(() => null);
export const delay = (fn: () => any, ms = 300) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => fn.apply(this), ms);
}