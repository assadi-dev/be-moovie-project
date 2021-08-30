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

/**
 *
 * @param {array} posts
 * @returns {array}
 * retourne un tableau contenant les postsle plus likés
 */
export const postMostLiked = (posts) => {
  return posts.sort((a, b) => {
    return b.likers.length > a.likers.length;
  });
};

/**
 *
 * @returns
 * Retoure un tableau contenant les utilisateurs non suivi
 */
export const getUserUnFollow = (userId, usersData) => {
  return usersData.filter((element) => {
    return !element.followers.includes(userId) && element._id !== userId;
  });
};

/**
 *
 * @param {array} userFollowing tableau contenant les personne suivis par l'utilisteur connecté
 * @param {string} id ID de la personne que l'on souhaite verifié
 * Vérifie si l'ID est compris dans le tableau des personne suivis
 */
export const isFollow = (userFollowing, id) => {
  return userFollowing.includes(id);
};
