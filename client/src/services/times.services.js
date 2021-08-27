import dayjs from "dayjs";

export const fullMonth = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

export const fullDay = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
];

/**
 *
 * @param {num} num
 * @returns Affiche le 0 aux chiffres inferieurs à 9
 */
export const fullNumber = (num) => {
  if (num < 10) {
    return "0" + num;
  }
  return num;
};

/**
 *
 * @param {*} date date
 * @returns {string}
 * Retourne la date au format 22 avril 2021
 */
export const getFullDate = (date) => {
  let d = dayjs(date).date();
  let m = dayjs(date).month();
  let y = dayjs(date).year();

  return `${fullNumber(d)} ${fullMonth[m]} ${y}`;
};

/**
 *
 * @param {*} date date
 * @returns {string}
 * Retourne la date au format 22/08/2021
 */
export const getDateNumeric = (date) => {
  let d = dayjs(date).date();
  let m = dayjs(date).month();
  let y = dayjs(date).year();

  return `${fullNumber(d)}/${fullNumber(m)}/${y}`;
};

/**
 *
 * @param {*} date date
 * @returns {string}
 * Retourne la date au format Lundi 23 avril 2021
 */
export const getFullDateWeek = (date) => {
  let day = dayjs(date);
  let d = dayjs(date).date();
  let m = dayjs(date).month();
  let y = dayjs(date).year();

  return `${fullDay[day]} ${fullNumber(d)} ${fullMonth[m]} ${y}`;
};

/**
 *
 * @param {*} date date
 * @returns {string}
 * Retourne l'heure au format 12:00
 */
export const getTimeMin = (date) => {
  let h = dayjs(date).hour();
  let m = dayjs(date).minute();

  return ` ${fullNumber(h)}:${fullNumber(m)} `;
};
