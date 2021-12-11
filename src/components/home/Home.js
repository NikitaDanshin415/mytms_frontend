import React from "react";
import './Home.css'
import manager from "../../helpers/manager";

export default class Home extends React.Component {

    state = {
        isLoaded: false,
        projects: null,
    }

    getProjects = async (token) => {
        const res = await fetch(`https://localhost:44354/api/1/Project`, {
            method: 'GET',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Authorization': 'Bearer ' + token,
            },
        });

        return await res.json();
    }

    componentDidMount() {
        manager.getUser()
            .then(async (user) => {
                if (user === null) {
                    console.log("Unauthorized");
                } else {
                    this.setState({
                        projects: await this.getProjects(user.access_token)
                        //надо думать
                    })
                }
            })
            .catch((error) => {
                console.log("project api error: " + error)
            })


    }

    render() {
        const projects = this.state.projects;

        return (
            <div className="Home">
                <h1>ProjectList</h1>

            </div>
        );
    }
}
