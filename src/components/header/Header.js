import React from "react";
import manager from "../../helpers/manager";
import "./Header.css";
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        manager.getUser().then(async res => {
            await this.setState({
                user: res.profile.name
            })
        })
    }

    render() {
        function logout() {
            manager.signoutRedirect();
        }

        return (
            <header className={"container"}>
                <div className={"row"}>
                    <div className={"col-9 p0 m0"}>
                        <div className={"header_title"}>
                            <Link to={"/"}>
                                <div>
                                    <h1>Система управления тестовыми сценариями</h1>
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className={"col-3 p0 m0"}>
                        <div className={"header_buttons"}>
                            <span>{this.state.user}</span>
                            <button className={"transition"} onClick={logout}>Выйти</button>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}