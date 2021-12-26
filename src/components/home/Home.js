import React from "react";
import './Home.css'
import manager from "../../helpers/manager";
import SearchPanel from "../serchPanel";
import ProjectList from "../projectList";
import PlusBtn from "../plusBtn/PlusBtn";
import AddProjectForm from "../addProjectForm/AddProjectForm";


export default class Home extends React.Component {

    state = {
        isLoaded: false,
        projects: [],
        term: '',
        showAddModel:false
    }

    getProjects = async (token) => {
        const res = await fetch(`https://localhost:44354/api/1/ProjectParticipant`, {
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
                        projects: a.projectParticipant
                    })
                }
            })
            .catch((error) => {
                console.log("project api error: " + error)
            })
    }

    serch(items, term) {
        if (term === '') {
            return items;
        }

        return items.filter((item) => {
            return item.project.projectName.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchChange = (term) => {
        this.setState({term});
    }

    showAddProjectForm = () => {
        this.setState({
            showAddModel:true
        })
    }

    hideAddProjectForm = () => {
        this.setState({
            showAddModel:false
        })
    }
    render() {
        const {projects, term} = this.state;
        const visivleItems = this.serch(projects, term);

        let qwe = null;
        if(this.state.showAddModel){
            qwe = <AddProjectForm hideModal = {this.hideAddProjectForm}/>
        }

        return (
            <div className="Home">
                <SearchPanel
                    onSerchChange = {this.onSearchChange}
                />
                <ProjectList
                    projects={visivleItems}
                />
                <PlusBtn
                    showModal = {this.showAddProjectForm}
                />
                {qwe}
            </div>
        )
    }
}
