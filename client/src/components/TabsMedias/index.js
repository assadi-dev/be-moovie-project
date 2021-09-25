import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import styles from "./style.module.css";
import { MovieSimilar } from "./MovieSimilar";

export default function TabsMedias({ movieId }) {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <div className={styles.headerTabs}>
      <MDBTabs className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink
            color="dark"
            onClick={() => handleBasicClick("tab1")}
            active={basicActive === "tab1"}
          >
            Films Similaires
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            color="dark"
            onClick={() => handleBasicClick("tab2")}
            active={basicActive === "tab2"}
          >
            Castings
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            color="dark"
            onClick={() => handleBasicClick("tab3")}
            active={basicActive === "tab3"}
          >
            Medias
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={basicActive === "tab1"}>
          {" "}
          <MovieSimilar movieId={movieId} />
        </MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab2"}>Tab 2 content</MDBTabsPane>
        <MDBTabsPane show={basicActive === "tab3"}>Tab 3 content</MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}
