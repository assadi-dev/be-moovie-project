import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";

const MovieTrendingPresentation = ({ itemId, classname }) => {
  return (
    <div className={styles.parentItem}>
      <MDBCarouselElement
        className={styles.picture}
        src="https://mdbcdn.b-cdn.net/img/new/slides/041.jpg"
        alt="..."
      />
      <MDBContainer st>
        <div className={styles.presentation}>
          <h5 className={styles.titleMovie}>Title</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus,
            quos? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Temporibus, quos?
          </p>
          <div>
            <MDBBtn className="mx-2" color="danger">
              Afficher
            </MDBBtn>
            <MDBBtn floating className="mx-2" outline color="white">
              <MDBIcon className="me-2" far icon="heart" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default MovieTrendingPresentation;
