import React from "react";
import styles from "./style.module.css";

const CardContact = () => {
  return (
    <div className={styles.contactCardContainer}>
      <div className={styles.left}>
        <img
          src="https://www.footpack.fr/wp-content/uploads/2018/04/Nike-Mercurial-R9-Mbappe%CC%81-Dembe%CC%81le%CC%81-6-335x601.jpg"
          alt="contact_avatar"
        />
        <p className={styles.pseudo}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias
          impedit exercitationem ad a modi laudantium sit. Quidem, recusandae
          in. Dolore voluptas atque qui molestias ratione aspernatur, quidem
          itaque voluptatem modi?
        </p>
      </div>
      <div className={styles.bottom}>
        <span className={styles.unfollowBtn}>Suivre </span>
      </div>
    </div>
  );
};

export default CardContact;
