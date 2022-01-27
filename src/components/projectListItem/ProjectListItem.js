import React from "react";
import "./ProjectListItem.css";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

export default class ProjectListItem extends React.Component {

    render() {

        const {project} = this.props;

        const date = new Date(project.project.additionDate);

        return (
            <div className={"projectItem container"}>
                <div className={"row"}>
                    <div className={"col-8"}>
                        <Link to={`/project/${project.project.id}`}>
                            <h2>{project.project.projectName}</h2>
                        </Link>
                        <div className={"projectItem_info"}>
                            <div>
                                <span>{project.projectRole.roleName}</span>
                            </div>
                            <div>
                                <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"col-auto"}>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <Link to={`/project/${project.project.id}/testCases`}>
                                    <Button type="button" className="btn btn-secondary m-1 bg-light text-black">Сценарии тестирования</Button>
                                </Link>

                                <Link to={`/project/${project.project.id}/users`}>
                                    <Button type="button" className="btn btn-secondary m-1 bg-light text-black">Пользователи</Button>
                                </Link>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}