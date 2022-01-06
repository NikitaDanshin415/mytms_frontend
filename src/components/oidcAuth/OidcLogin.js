import {UserManager} from "oidc-client";

export const  OidcLogin = () => {
    const manager = new UserManager({
        loadUserInfo: true,
        response_mode: "query"
    });

    manager.signinRedirectCallback()
        .then( user => {
            console.log(user);
            window.location.href = "http://localhost:3000/";
        })
        .catch(error => {
            console.log(error);
        })

    return(
        ""
    );
}

