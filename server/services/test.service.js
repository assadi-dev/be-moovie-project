const bcrypt = require("bcrypt");

exports.userData = {
  pseudo: "user",
  email: "user@email.com",
  confirmPassword: "PasswordX123",
  password: "PasswordX123",
  birthday: "1993-03-08",
  presentation: "",
};

/**
 *
 * @returns génere un utilisateur avec mot de pass crypté
 */
exports.createUser = async () => {
  let passwordCrypt = await bcrypt.hash(this.userData.password, 16);
  const user = {
    pseudo: this.userData.pseudo,
    password: passwordCrypt,
    email: this.userData.email,
    birthday: this.userData.birthday,
    presentation: this.userData.presentation,
  };

  return user;
};
