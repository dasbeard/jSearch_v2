export const checkImageURL = (url) => {
  if (!url) return false;
  else {
    const pattern = new RegExp(
      '^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp|tiff|apng|ico)',
      'i'
    );
    return pattern.test(url);
  }
};
