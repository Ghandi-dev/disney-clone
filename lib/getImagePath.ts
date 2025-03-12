const getImagePath = (imagePath?: string, fullSize?: boolean) => {
  return imagePath ? `https://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}${imagePath}` : "/no-image-svgrepo-com.svg";
};

export default getImagePath;
