import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { MDBBadge, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
import { get_notification } from "../../redux/actions/user.action";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.NotificationReducers);
  const [show, setShow] = useState(false);

  const Empty = () => {
    return (
      <li
        style={{
          padding: "18px 8px",
          textAlign: "center",
          fontWeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "5rem",
        }}
      >
        <p style={{ margin: 0 }}>Vous n'avez pas de notification</p>
      </li>
    );
  };

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    dispatch(get_notification());
  }, [show]);

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
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <NotificationItem
                    key={index}
                    idNotification={notification.id}
                    author={notification.author}
                    action={notification.action}
                    read={notification.read}
                  />
                ))
              ) : (
                <Empty />
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Notification;
