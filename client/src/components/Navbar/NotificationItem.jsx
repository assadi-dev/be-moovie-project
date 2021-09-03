import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { update_notification } from "../../redux/actions/user.action";
import { getDateNumeric, getTimeMin } from "../../services/times.services";

const NotificationItem = ({
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
  useEffect(() => {}, [dispatch, readItem]);

  switch (action) {
    case "post":
      message = `à publié une nouvel article`;
      break;
    default:
      message = "";
  }
  const handleReadItem = (e) => {
    dispatch(update_notification(idNotification));
    setReadItem(true);
  };

  return (
    <>
      <li
        className={classNames(styles.listItems, readItem ? styles.read : "")}
        onMouseOver={handleReadItem}
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
      </li>
    </>
  );
};

export default NotificationItem;
