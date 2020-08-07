import Unsplash from "unsplash-js";

export const getPhotos = async (keyword, page) => {
  const unsplash = new Unsplash({
    accessKey: "-JPFsxZuH8Sp-vfWrhro6GNonY-F4ByRHM6iZRotolQ",
    secret: "pD0yIhIU40sRUAAaiXydOTj7qXJgh_-amgLRYqMSa8U",
  });
  try {
    const response = await unsplash.search.photos(keyword, page, 9, {
      orientation: "landscape",
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
