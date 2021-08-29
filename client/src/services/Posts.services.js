/**
 *
 * @param {array} userPostLikes tableau contenant les Id des posts liké par l'utilisateur
 * @param {string} postId Id du post
 * @return {boolean}
 * verifie si l'id de lutilisateur est compris dans le champs likers de post
 */
export const isLiked = (userPostLikes, postId) => {
  return userPostLikes.includes(postId);
};
