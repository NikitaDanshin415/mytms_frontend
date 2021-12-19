import React from "react";
import manager from "../../helpers/manager";
import "./Header.css";

export default class Header extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        manager.getUser().then(async res =>{
            await this.setState({
                user: res.profile.name
            })
        })
    }

    render() {
        function logout(){
            manager.signoutRedirect();
        }

        return(
            <header>
                <div className={"header_title"}>
                    <h1>Система управления тестовыми сценариями</h1>
                </div>
                <div className={"header_buttons"}>
                    <span>{this.state.user}</span>
                    <button className={"transition"} onClick={logout}>Выйти</button>
                </div>
            </header>
        )
    }
}