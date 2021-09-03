import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { MDBBadge, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
import { get_notification } from "../../redux/actions/user.action";
import { useAuthState } from "../../utils/context/AuthContext";
import { io } from "socket.io-client";

const Notification = () => {
  const dispatch = useDispatch();
  const userId = useAuthState().userId;
  const notifications = useSelector((state) => state.NotificationReducers);
  const [show, setShow] = useState(false);
  const socket = io.connect(`http://${window.location.hostname}:6500`);

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
    dispatch(get_notification(userId));
    return () => socket.close();
  }, []);

  return (
    <>
      <div className={styles.iconNotifContainer}>
        <span className={styles.iconNotif} onClick={handleShow}>
          <MDBIcon far icon="bell" />
          {notifications.filter((notification) => notification.read === false)
            .length > 0 && <MDBBadge color="danger" dot />}
        </span>
        {show && (
          <div className={styles.DropDownNotif}>
            <ul className={styles.listContainer}>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <NotificationItem
                    key={index}
                    idNotification={notification._id}
                    author={notification.author}
                    action={notification.action}
                    read={notification.read}
                    createdAt={notification.createdAt}
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
