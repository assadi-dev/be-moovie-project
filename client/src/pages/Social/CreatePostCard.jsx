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

const CreatePostCard = ({ userData }) => {
  const [postValue, setPostValue] = useState({
    author: "",
    message: "",
    pseudo: "",
    picture: "",
  });
  const [preViewFile, setpreViewFile] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const iniUser = () => {
      setPostValue({
        ...postValue,
        pseudo: userData.pseudo,
        author: userData.id,
      });
    };
    iniUser();
  }, [postValue.message, postValue.image, dispatch]);

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
    dispatch(create_post(data));
    dispatch(get_all_post());
  };

  return (
    <div>
      <MDBCard>
        <form onSubmit={handleSubmitPost}>
          <MDBCardBody>
            <div className={styles.post}>
              <div className={styles.rowPostInput}>
                <div className={styles.avatarCol}>
                  <img
                    src="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(webp):focal(1421x431:1423x429)/origin-imgresizer.eurosport.com/2020/12/22/2959891-60753748-2560-1440.jpg"
                    alt="user_avatar"
                  />
                </div>
                <div className={styles.inputCol}>
                  <div className={styles.postInputCreate}>
                    <textarea
                      placeholder="Quoi de neuf ?"
                      style={{ padding: "10px" }}
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
