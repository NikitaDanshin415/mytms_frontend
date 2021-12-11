import './App.css';
import Auth from "./components/auth";
import Home from "./components/home";
import manager from "./helpers/manager";
import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {OidcLogin} from "./components/oidcAuth/OidcLogin"
import Header from "./components/header/Header";

export default class App extends React.Component {

    state = {
        isLogin: false,
        user: null,
    }

    async componentDidMount() {

        await manager.getUser()
            .then((user) => {
                if (user) {
                    this.setState({
                        isLogin: true,
                        user: user.profile.name,
                    })
                } else {
                    console.log("user not logged in")
                    this.setState({
                        isLogin: false,
                        user: null,
                    })
                }
            });
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div className="App">
                    <Header user={this.state.user}/>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="*" element={<h1>NotFound</h1>}/>
                        </Routes>
                    </Router>
                </div>
            );
        }

        return (
            <div className="App">
                <Router>
                    <Routes>
                        <Route path="/" element={ <Auth/>}/>
                        <Route path="/oidcLogin" element={<OidcLogin/>}/>
                        <Route path="*" element={<h1>NotFound</h1>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}
