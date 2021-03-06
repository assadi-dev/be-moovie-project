import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import MediaInputBtn from "../../components/mediaIconInput";
import PreviewPost from "./PreviewPost";
import { useDispatch } from "react-redux";
import { create_post, get_all_post } from "../../redux/actions/post.action";
import { io } from "socket.io-client";

const CreatePostCard = ({ userData }) => {
  const [postValue, setPostValue] = useState({
    author: "",
    message: "",
    pseudo: "",
    picture: "",
  });
  const [preViewFile, setpreViewFile] = useState("");

  const dispatch = useDispatch();
  const socket = io.connect(`http://${window.location.hostname}:6500`);

  useEffect(() => {
    const iniUser = () => {
      setPostValue({
        ...postValue,
        pseudo: userData.pseudo,
        author: userData.id,
      });
    };
    iniUser();

    return () => socket.close();
  }, [postValue.message]);

  const handleChangeValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setPostValue({ ...postValue, [name]: value });
  };
  /**
   * @return {boolean}  verifie la presence d'un contenue
   */
  const isCreate = ({ message, picture }) => {
    if (message || picture) {
      return true;
    } else {
      return false;
    }
  };

  //Previsualisation des fichiers
  const preViewImage = (e) => {
    let file = URL.createObjectURL(e.target.files[0]);
    setPostValue({
      ...postValue,
      picture: e.target.files[0],
    });
    setpreViewFile(file);
  };

  const resetPost = () => {
    setPostValue({ ...postValue, message: "", picture: "" });
    setpreViewFile("");
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("author", postValue.author);
    data.append("pseudo", postValue.pseudo);
    data.append("message", postValue.message);
    data.append("picture", postValue.picture);

    if (postValue.message === "") {
      return false;
    }
    setPostValue({ ...postValue, message: "", picture: "" });
    setpreViewFile("");
    dispatch(create_post(data));
    let socketData = {
      author: postValue.author,
      action: "post",
      sourceId: "",
      followers: userData.followers,
    };
    socket.emit("createdPost", socketData);
  };

  return (
    <div>
      <MDBCard>
        <form onSubmit={handleSubmitPost}>
          <MDBCardBody>
            <div className={styles.post}>
              <div className={styles.rowPostInput}>
                <div className={styles.avatarCol}>
                  <img src={userData.avatar} alt="user_avatar" />
                </div>
                <div className={styles.inputCol}>
                  <div className={styles.postInputCreate}>
                    <textarea
                      placeholder="Quoi de neuf ?"
                      rows="1"
                      onChange={handleChangeValue}
                      name="message"
                      value={postValue.message}
                      required
                    ></textarea>
                  </div>
                  <div className={styles.media}>
                    <MediaInputBtn
                      name="picture"
                      icon={<MDBIcon far icon="image" size="2x" />}
                      accept={".jpg,.jpeg,.png,.gif"}
                      onChange={preViewImage}
                    />
                  </div>
                </div>
              </div>
            </div>
          </MDBCardBody>
          {preViewFile && <PreviewPost file={preViewFile} />}
          <MDBCardFooter>
            <div className={styles.rowBtn}>
              {isCreate(postValue) && (
                <MDBBtn type="button" color="danger" onClick={resetPost}>
                  Annuler la publication
                </MDBBtn>
              )}
              <MDBBtn type="submit" color="info">
                Publier
              </MDBBtn>
            </div>
          </MDBCardFooter>
        </form>
      </MDBCard>
    </div>
  );
};

export default CreatePostCard;
