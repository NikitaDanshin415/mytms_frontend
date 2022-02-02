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
import ProjectTestCaseList from "./components/projectTestCaseList/TestCaseList";
import ProjectUserList from "./components/projectUserList/ProjectUserList";
import ProjectTestCaseDetails from "./components/projectTestCaseDetails/ProjectTestCaseDetails";
import AddTestCasePage from "./components/addTestCasePage/AddTestCasePage";
import EditTestCasePage from "./components/editTestCasePage/EditTestCasePage";
import UseTestCase from "./components/UseTestCase/UseTestCase";
import TestCaseResults from "./components/TestCaseResults/TestCaseResults";
import TestCaseResultDetails from "./components/testCaseResultDetails/TestCaseResultDetails";

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
                            <Route path="/project/:id/testCases/:TestCaseId/edit" element={<EditTestCasePage/>}/>
                            <Route path="/project/:id/testCases/:TestCaseId" element={<ProjectTestCaseDetails/>}/>
                            <Route path="/project/:id/testPlan/:testPlanId/testCase/:TestCaseId/use" element={<UseTestCase/>}/>
                            <Route path="/project/:id/testPlan/:testPlanId/testCase/:TestCaseId/results" element={<TestCaseResults/>}/>
                            <Route path="/project/:id/testPlan/:testPlanId/testCase/:TestCaseId/results/:resultId" element={<TestCaseResultDetails/>}/>
                            <Route path="/project/:id/testCases/add" element={<AddTestCasePage/>}/>
                            <Route path="/project/:id/testCases" element={<ProjectTestCaseList/>}/>
                            <Route path="/project/:id/users" element={<ProjectUserList/>}/>
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
                        <Route path="/oidcLogin" element={<OidcLogin/>}/>
                        <Route path="*" element={<Auth/>}/>
                    </Routes>
                </Router>
            </div>
        );
    }
}
