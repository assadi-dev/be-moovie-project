const bcrypt = require("bcrypt");

/**
 *
 * @returns génere un utilisateur avec mot de pass crypté
 */
exports.createUser = async (user) => {
  let passwordCrypt = await bcrypt.hash(user.password, 16);
  user = { ...user, password: passwordCrypt };

  return user;
};
