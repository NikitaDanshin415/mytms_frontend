import React from "react";
import "./AddProjectForm.css";
import TmsApi from "../../services/TmsApi";
import manager from "../../helpers/manager";

export default class AddProjectForm extends React.Component {

    state = {
        projectName: "",
    }

    api = new TmsApi();

    addProject = async (e) => {
        e.preventDefault();

        const projectData = {
            projectName: this.state.projectName,
        }

        await this.api
            .createProject(projectData)

        this.props.hideModal();
    }

    editField = (e) => {
        this.setState({
            projectName: e.target.value
        })
    }

    render() {

        const hide = this.props.hideModal;

        return (
            <div className={"modal_shade"}>
                <div className={"modal"}>
                    <div className={"modal_header"}>
                        <h2>Добавление проекта</h2>
                        <div className={"hide_button"} onClick={hide}>X</div>
                    </div>
                    <div className={"modal_content"}>

                        <form className={"modal_addForm"}>
                            <input type={"text"} onChange={this.editField}/>
                            <button onClick={this.addProject}>Добавить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}