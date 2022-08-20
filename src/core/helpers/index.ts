export const generateId = function () {
  return Date.now().toString(32).substr(4) + '_' + Math.random().toString(36).substr(2, 9);
};