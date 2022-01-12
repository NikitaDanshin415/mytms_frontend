import './App.css';
import Auth from "./components/auth";
import Home from "./components/home";
import manager from "./helpers/manager";
import React from "react";
import {Route, Routes, BrowserRouter as Router} from "react-router-dom";
import {OidcLogin} from "./components/oidcAuth/OidcLogin"
import Header from "./components/header/Header";
import Project from "./components/project";
import NotFound from "./components/notFound/NotFound";

export default class App extends React.Component {

    state = {
        isLogin: false,
        user: null,
        token: null
    }

    async componentDidMount() {

        await manager.getUser()
            .then((user) => {
                if (user) {
                    this.setState({
                        isLogin: true,
                        user: user.profile.name,
                        token: user.access_token,
                    })
                } else {
                    console.log("user not logged in")
                    this.setState({
                        isLogin: false,
                        user: null,
                        token: null,
                    })
                }
            });
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div className="container">
                    <Router>
                        <Header user={this.state.user}/>
                        <Routes>
                            <Route path="/project/:id" element={<Project/>}/>
                            <Route path="/" element={<Home/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>

                    </Router>
                </div>


            );
        }

        return (
            <div className="App auth container">
                <Router>
                    <Routes>
                        <Route path="/" element={<Auth/>}/>
                        <Route path="/oidcLogin" element={<OidcLogin/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}
