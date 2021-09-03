import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import {
  delete_notification,
  update_notification,
} from "../../redux/actions/user.action";
import { getDateNumeric, getTimeMin } from "../../services/times.services";
import { MDBIcon } from "mdb-react-ui-kit";

const NotificationItem = ({
  userId,
  idNotification,
  author,
  action,
  sourceId,
  read,
  createdAt,
}) => {
  const avatar = "";
  const pseudo = author;
  var message = "";
  const [readItem, setReadItem] = useState(read);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch]);

  switch (action) {
    case "post":
      message = `à publié une nouvel article`;
      break;
    default:
      message = "";
  }
  const handleReadItem = () => {
    if (read === false) {
      let data = { idNotification: idNotification, read: true };
      dispatch(update_notification(userId, data));
      setReadItem(true);
    }
  };

  const handleDeleteItem = () => {
    let data = { idNotification: idNotification };
    dispatch(delete_notification(userId, data));
  };

  return (
    <>
      <li
        className={classNames(styles.listItems, readItem ? styles.read : "")}
        onClick={handleReadItem}
      >
        {<img className={styles.avatar} src={avatar} alt="author_picture" />}
        <div className={styles.blocMessage}>
          <span className={styles.message}>
            <span className={styles.author}>{author}</span>
            {message}
          </span>

          <p className={styles.createAt}>{`le ${getDateNumeric(
            createdAt
          )} à ${getTimeMin(createdAt)}`}</p>
        </div>
        <span className={styles.deletebtn} onClick={handleDeleteItem}>
          {" "}
          <MDBIcon fas icon="times" />{" "}
        </span>
      </li>
    </>
  );
};

export default NotificationItem;
