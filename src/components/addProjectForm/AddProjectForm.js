import React from "react";
import "./AddProjectForm.css";

export default class AddProjectForm extends React.Component{
    render() {

        const hide = this.props.hideModal;

        return(
            <div className={"modal"}>
                <input type={"text"}/>
                <button onClick={hide}>X</button>
            </div>
        )
    }
}