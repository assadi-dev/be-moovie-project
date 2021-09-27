import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import CardContact from "../../components/ContactCard";
import { getUserUnFollow } from "../../services/Posts.services";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.AllUsersReducers);
  const usersId = useSelector((state) => state.UserReducers.id);
  const [userUnfollow, setUserUnfollow] = useState([]);
  const [serchContact, setSearchContact] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let getunFollowList = getUserUnFollow(usersId, users.collections);
    setUserUnfollow(getunFollowList);
    setLoading(false);
  }, [serchContact, loading, dispatch, usersId, users.collections]);

  const handleSearchContact = (e) => {
    let value = e.target.value;
    setSearchContact(value);
  };

  return (
    <>
      <MDBCard className={styles.suggestion}>
        <MDBCardBody>
          <MDBCardTitle>Vous n'etes pas seuls</MDBCardTitle>
          <div className={styles.searchContactInput}>
            <input
              type="text"
              className="form-control"
              placeholder="Rechercher une personne"
              onChange={handleSearchContact}
              value={serchContact}
            />
          </div>
          <div>
            {!loading &&
              userUnfollow
                .filter((contact) => {
                  return contact.pseudo
                    .toLowerCase()
                    .includes(serchContact.toLowerCase());
                })
                .map((user, index) => (
                  <CardContact key={index} userId={usersId} data={user} />
                ))}
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Contact;
