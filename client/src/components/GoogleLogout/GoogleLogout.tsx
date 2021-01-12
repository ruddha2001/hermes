import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "141013092058-8dlj5a97ntpqoho95lksjeu2jla6ro6f.apps.googleusercontent.com";

const GoogleLogoutButton = () => {
  const onSuccess = () => {
    console.log("Logout made successfully");
    alert("Logout made successfully ✌");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
};

export default GoogleLogoutButton;
