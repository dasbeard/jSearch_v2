export const checkImageIsSVG = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp('^https?:\\/\\/.+\\.(svg)$', 'i');
    return pattern.test(url);
  }
};
