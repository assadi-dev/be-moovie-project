import React, { useState } from "react";
import styles from "./style.module.css";
import { MDBBadge, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.NotificationReducers);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  return (
    <>
      <div className={styles.iconNotifContainer}>
        <span className={styles.iconNotif} onClick={handleShow}>
          <MDBIcon far icon="bell" />
          {notifications.length > 0 && <MDBBadge color="danger" dot />}
        </span>
        {show && (
          <div className={styles.DropDownNotif}>
            <ul className={styles.listContainer}>
              {notifications.map((notification, index) => (
                <NotificationItem key={index} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
