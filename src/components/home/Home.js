import React from "react";
import './Home.css'
import manager from "../../helpers/manager";
import SearchPanel from "../serchPanel";


export default class Home extends React.Component {

    state = {
        isLoaded: false,
        projects: [],
        term: '',
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

        return await res.json()
    }

    componentDidMount() {
        manager.getUser()
            .then(async (user) => {
                if (user === null) {
                    console.log("Unauthorized");
                } else {
                    let a = await this.getProjects(user.access_token);
                    this.setState({
                        projects: a.projects
                    })
                }
            })
            .catch((error) => {
                console.log("project api error: " + error)
            })
    }

    serch(items, term){
        if(term === ''){
            return items;
        }

        return items.filter((item)=>{
            return item.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchChange = (term) =>{
        this.setState({term});
    }

    render() {
        const {projects, term} = this.state;

        const visivleItems = this.serch(projects, term);

        if (visivleItems != null) {
            return (
                <div className="Home">
                    <SearchPanel
                        onSerchChange = {this.onSearchChange}
                    />
                    {visivleItems.map(
                        e =>
                            <div key={e.id}>
                                <h2>{e.projectName}</h2>
                                <div>{e.id}</div>
                                <div>{e.projectStatusId}</div>
                                <hr/>
                            </div>
                    )}
                    <div>+
                    </div>
                </div>
            )
        }
        return (
            <div className="Home">
                <SearchPanel/>
            </div>
        );
    }
}
