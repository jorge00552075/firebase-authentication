import React, { Fragment, useContext } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/Header.jsx";
import AccountMain from "../components/AccountMain.jsx";
import AuthContext from "../context/auth-context.jsx";

const Account = function () {
  const { documentData } = useContext(AuthContext);

  if (!documentData) return <LoadingSpinner />;
  return (
    <Fragment>
      <Header />
      <main>
        <AccountMain />
      </main>
    </Fragment>
  );
};

export default Account;
