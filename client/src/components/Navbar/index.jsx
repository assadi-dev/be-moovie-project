import React from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";

const Navbar = () => {
  return (
    <>
      <MDBNavbar fixed="top" light bgColor="transparent">
        <MDBContainer fluid>
          <MDBNavbarBrand tag="span" className="mb-0 h1" href="/">
            <img
              src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.png"
              height="30"
              alt=""
              loading="lazy"
            />
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
};

export default Navbar;
