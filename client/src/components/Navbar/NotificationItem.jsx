import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { update_notification } from "../../redux/actions/user.action";

const NotificationItem = ({
  idNotification,
  author,
  action,
  source,
  read,
  date,
}) => {
  const avatar = "";
  const pseudo = author;
  var message = "";
  const [readItem, setReadItem] = useState(read);
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, readItem]);

  switch (action) {
    case "create post":
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
        </div>
      </li>
    </>
  );
};

export default NotificationItem;
