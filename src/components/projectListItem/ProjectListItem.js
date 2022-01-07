import React from "react";
import "./ProjectListItem.css";
import {Link} from "react-router-dom";

export default class ProjectListItem extends React.Component {

    render() {

        const {project} = this.props;

        const date = new Date(project.project.additionDate);

        return (
            <div className={"projectItem"}>
                <Link to={`/project/${project.project.id}`}>
                    <h2>{project.project.projectName}</h2>
                </Link>
                <div className={"projectItem_info"}>
                    <div>
                        <span>{project.projectRole.roleName}</span>
                    </div>
                    <div>
                        <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1 }.{date.getFullYear()}</span>
                    </div>
                </div>
            </div>
        )
    }
}