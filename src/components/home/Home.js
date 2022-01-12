import React from "react";
import './Home.css'
import SearchPanel from "../serchPanel";
import ProjectList from "../projectList";
import PlusBtn from "../plusBtn/PlusBtn";
import AddProjectForm from "../addProjectForm/AddProjectForm";
import TmsApi from "../../services/TmsApi";


export default class Home extends React.Component {

    state = {
        isLoaded: false,
        projects: [],
        term: '',
        showAddModel: false
    }

    api = new TmsApi();

    getProjects = async () => {
       return this.api.getProjects();
    }

    componentDidMount() {
        this.api.getProjects()
            .then((res) => {
                this.setState({
                    projects: res.projectParticipant
                });
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.showAddModel !== this.state.showAddModel) {
            this.getProjects()
                .then((res) =>{
                    this.setState({
                        projects: res.projectParticipant
                    });
                });
        }
    }

    search(items, term) {
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
            showAddModel: true
        })
    }

    hideAddProjectForm = () => {
        this.setState({
            showAddModel: false
        })
    }

    render() {
        const {projects, term} = this.state;
        const visivleItems = this.search(projects, term);

        let modalAddForm = null;
        if (this.state.showAddModel) {
            modalAddForm = <AddProjectForm show={"true"} handleClose={this.hideAddProjectForm}/>
        }

        return (
            <div className="Home">
                <SearchPanel
                    onSerchChange={this.onSearchChange}
                />
                <ProjectList
                    projects={visivleItems}
                />
                <PlusBtn
                    showModal={this.showAddProjectForm}
                />
                {modalAddForm}
            </div>
        )
    }
}

