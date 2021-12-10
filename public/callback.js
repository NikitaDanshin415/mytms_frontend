

const manager = new Oidc.UserManager({
    loadUserInfo: true,
    response_mode: "query"
});



manager.signinRedirectCallback()
    .then(function(user){
        console.log(user);
        console.log("r");
        window.location.href = "http://localhost:3000/";
        console.log("t");
    })
    .catch(function (error){
        console.log(error);
    });