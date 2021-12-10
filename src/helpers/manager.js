import {UserManager} from "oidc-client";

const settings = {
    authority: "https://localhost:5001",
    client_id: "client_id_js",
    response_type: "code",
    scope: "openid profile TmsWebApi",
    redirect_uri: "http://localhost:3000/callback.html"
}

const manager = new UserManager(settings);

export default manager;