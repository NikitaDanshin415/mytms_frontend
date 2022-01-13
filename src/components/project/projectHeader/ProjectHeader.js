import React from "react";
import {Link} from "react-router-dom";

const ProjectHeader = (props) => {
    const {projectInfo, role} = props;
    const date = new Date(projectInfo.additionDate);


    return (
        <div className={"row"}>
            <div className={"projectHeader container"}>
                <div className={"row"}>
                    <h2>{projectInfo.projectName}</h2>
                </div>
                <div className={"row"}>
                    <div className={"col-10"}>
                        <div className={"projectItem_info"}>
                            <div>
                                <span>{role.roleName}</span>
                            </div>
                            <div>
                                <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"col-2"}>
                        <Link to={`./testCases`}>Сценарии тестирования</Link>
                        <Link to={`./users`}>Пользователи</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader;