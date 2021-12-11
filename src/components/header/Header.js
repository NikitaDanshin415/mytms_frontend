import React from "react";
import manager from "../../helpers/manager";

export default class Header extends React.Component {


    render() {

        function logout(){
            manager.signoutRedirect();
        }

        return(
            <header>
                <button onClick={logout}>Выйти</button>
            </header>
        )
    }
}