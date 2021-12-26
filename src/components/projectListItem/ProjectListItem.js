import React from "react";
import "./ProjectListItem.css";

export default class ProjectListItem extends React.Component {

    render() {

        const {project} = this.props;

        const date = new Date(project.project.additionDate);

        return (
            <div className={"projectItem"}>
                <h2>{project.project.projectName}</h2>

                <div className={"projectItem_info"}>
                    <div>
                        <span>{project.projectRole.roleName}</span>
                    </div>
                    <div>
                        <span>Дата создания проекта: {date.getDate()}.{date.getMonth()}.{date.getFullYear()}</span>
                    </div>
                </div>

            </div>
        )
    }
}