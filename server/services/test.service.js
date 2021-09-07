const bcrypt = require("bcrypt");
const fs = require("fs");

/**
 *
 * @returns génere un utilisateur avec mot de pass crypté
 */
exports.createUser = async (user) => {
  let passwordCrypt = await bcrypt.hash(user.password, 16);
  user = { ...user, password: passwordCrypt };

  return user;
};

/**
 *
 * @param {string} name  nom du dossier
 * @param {string} dir  emplacement du dossier
 * création du dossier
 */
exports.createDir = async (name, dir) => {
  fs.exists(dir, (doc) => {
    if (!doc) {
      return fs.mkdir(dir, { recursive: true }, (error) => {
        if (error) console.log(error);
      });
    }
  });
};
