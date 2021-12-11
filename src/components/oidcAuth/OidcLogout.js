import {UserManager} from "oidc-client";

export const  OidcLogout = () => {
    const manager = new UserManager({
        loadUserInfo: true,
        response_mode: "query"
    });

    manager.signinRedirectCallback()
        .then( () => {
            window.location.href = "http://localhost:3000/";
        })
        .catch(error => {
            window.location.href = "http://localhost:3000/";
            console.log(error);
        })
}

