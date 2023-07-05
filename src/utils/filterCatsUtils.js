/**
 * Returns a new array (deep copy) of images with breedless cats removed
 * deep copy was preferable to avoid mutating the original array
 * @param images {Array}
 * @returns {unknown[]}
 */
export const removeBreedlessCats = (images = []) => images.reduce((acc, image) => {
  if(image.breeds?.length === 0) return acc;
  return [...acc, image];
}, []);

/**
 * Returns a new array (deep copy) of images with duplicate images removed
 * deep copy was preferable to avoid mutating the original array
 * @param images {Array}
 * @returns {unknown[]}
 */
export const removeDuplicates = (images = []) => images.reduce((acc, image) => {
  if(acc.find((i) => i.id === image.id)) return acc;
  return [...acc, image];
}, []);

/**
 * Returns a new array (deep copy) of images with
 * * breedless cats
 * * duplicates
 * removed
 * @param images {Array}
 * @returns {unknown[]}
 */
export const filterCats = (images = []) => {
  const breedlessCats = removeBreedlessCats(images);
  const uniqueCats = removeDuplicates(breedlessCats);
  return uniqueCats;
}

/**
 * Returns a new string with
 * * leading and trailing whitespace removed
 * * all characters lowercased
 * @param searchText
 * @returns {string}
 */
export const sanitizeSearchText = (searchText = "") => {
  return searchText.trim().toLowerCase();
}
/**
 * Returns a new array (deep copy) of images where the breed name includes the searchText
 * @param images
 * @param searchText
 * @returns {*[]}
 */
export const searchCatBreeds = (images = [], searchText = "") => {
  const sanitizedSearchText = sanitizeSearchText(searchText);
  if (sanitizedSearchText.length === 0) return images;
  return images.reduce((acc, image) => {
    const breed = image?.breeds?.[0]?.name?.toLowerCase();
    if(breed?.includes(sanitizedSearchText)) return [...acc, image];
    return acc;
  }, []);
}