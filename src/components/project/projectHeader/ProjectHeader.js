import React from "react";
import {Link} from "react-router-dom";

const ProjectHeader = (props) => {
    const {projectInfo, role} = props;
    const date = new Date(projectInfo.additionDate);


    return (
        <div className={"row"}>
            <div className={"projectHeader container-fluid"}>
                <div className={"row"}>
                    <h2>{projectInfo.projectName}</h2>
                </div>

                <div className={"row"}>
                    <div className={"col-8"}>
                        <div className={"projectItem_info"}>
                            <div>
                                <span>{role.roleName}</span>
                            </div>
                            <div>
                                <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-auto"}>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <Link to={`/project/${projectInfo.id}/testCases`}>
                                    <button type="button" className="btn btn-secondary m-1">Сценарии тестирования</button>
                                </Link>

                                <Link to={`/project/${projectInfo.id}/users`}>
                                    <button type="button" className="btn btn-secondary m-1">Пользователи</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader;