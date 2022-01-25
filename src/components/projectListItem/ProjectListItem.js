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

                    <div className={"col-4"}>
                        <div className={"d-flex justify-content-around"}>
                            <Link to={`/project/${project.project.id}/TestCases`}>
                                <Button>Сценарии тестирования</Button>
                            </Link>
                            <Link to={`/project/${project.project.id}/Users`}>
                                <Button>Пользователи</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}