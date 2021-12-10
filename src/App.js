import './App.css';
import Auth from "./components/auth";
import Home from "./components/home";
import manager from "./helpers/manager";
import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";

export default class App extends React.Component {

    state = {
        isLogin: false,
        user: null,
    }

    async componentDidMount() {

        await manager.getUser()
            .then((user) => {
                if (user) {
                    console.log("user logged in", user);
                    this.setState({
                        isLogin: true,
                    })
                } else {
                    console.log("user not logged in")
                    this.setState({
                        isLogin: false,
                    })
                }
            });
    }

    render() {
        if (this.state.isLogin) {
            return (
                <div className="App">
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
                <Auth/>
            </div>
        );
    }
}
