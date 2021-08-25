/**
 *
 * @param {number} id
 * @param {string} title
 * @returns {string}
 * Genère un slug en remplaçant les espace par un underscore
 */

export const generate_slug = (id, title) => {
  let checkSpace = /(\s)/g;
  let clean_title = title.trim().toLowerCase().replace(checkSpace, "_");
  let clean_id = id;

  let concate = `${clean_title}`;

  return concate;
};
