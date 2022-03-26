import React from "react";

import Header from "../components/Header.jsx";
import InfoTable from "../components/InfoTable.jsx";

const Profile = function () {
  console.log("Profile");
  return (
    <React.Fragment>
      <Header />
      <InfoTable />
    </React.Fragment>
  );
};

export default Profile;
