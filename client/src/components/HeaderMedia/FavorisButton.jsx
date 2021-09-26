import React, { useState, useEffect } from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { addFavoris, removeFavoris } from "../../redux/actions/movies.action";

const FavorisButton = ({ id }) => {
  const [isFavorie, setIsFavorie] = useState(false);

  const dispatch = useDispatch();
  const favoris = useSelector((state) => state.UserReducers.movies);

  useEffect(() => {
    let idString = id ? id.toString() : "";
    if (favoris.includes(idString)) {
      setIsFavorie(true);
    } else {
      setIsFavorie(false);
    }
  }, [id]);

  const handleAddFavorie = () => {
    setIsFavorie(true);
    dispatch(addFavoris(id));
  };

  const handleRemoveFavorie = () => {
    dispatch(removeFavoris(id));
    setIsFavorie(false);
  };
  return (
    <>
      {isFavorie ? (
        <MDBBtn outline color="white" onClick={handleRemoveFavorie}>
          <MDBIcon className="me-2" fas icon="heart" />
          Retirer de mes favories
        </MDBBtn>
      ) : (
        <MDBBtn outline color="white" onClick={handleAddFavorie}>
          <MDBIcon className="me-2" far icon="heart" />
          Ajouter dans mes Favoris
        </MDBBtn>
      )}
    </>
  );
};

export default FavorisButton;
