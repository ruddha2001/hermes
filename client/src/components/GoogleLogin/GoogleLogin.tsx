import React from "react";

import { GoogleLogin } from "react-google-login";
import { refreshTokenSetup } from "../../utils/refreshToken";

const clientId =
  "141013092058-8dlj5a97ntpqoho95lksjeu2jla6ro6f.apps.googleusercontent.com";

const GoogleLoginButton = () => {
  const onSuccess = (res: any) => {
    console.log("Login Success: currentUser:", res.tokenObj.id_token);
    localStorage.setItem("token", res.tokenObj.id_token);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res: any) => {
    console.log("Login failed: res:", res);
    alert(
      `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
};

export default GoogleLoginButton;
