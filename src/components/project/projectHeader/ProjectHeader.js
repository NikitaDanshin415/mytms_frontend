import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import NotFound from "../../notFound";
import TmsApi from "../../../services/TmsApi";

const ProjectHeader = () => {
    const [projectId] = useState(useParams().id);

    const [projectInfo, setProjectInfo] = useState({
        additionToProject: null,
        id: null,
        project: {
            additionDate: null,
            id: null,
            projectName: null,
            projectStatus: null,
            projectStatusId: null,
        },
        projectRole: {
            id: null,
            roleName: null,
        }
    });

    const api = new TmsApi();

    useEffect(() => {
        api
            .getProject(projectId)
            .then((json) => {
                setProjectInfo({
                    additionToProject: json.additionToProject,
                    id: json.id,
                    project: {
                        additionDate: json.project.additionDate,
                        id: json.project.id,
                        projectName: json.project.projectName,
                        projectStatus: json.project.projectStatus,
                        projectStatusId: json.project.projectStatusId,
                    },
                    projectRole: {
                        id: json.projectRole.id,
                        roleName: json.projectRole.roleName
                    }
                })
            }).catch((error) => {
            console.log(error)
            return(
                <NotFound/>
            )
        });
    }, [])


    const date = new Date(projectInfo.project.additionDate);

    return (
        <div className={"row"}>
            <div className={"projectHeader container-fluid"}>
                <div className={"row"}>
                    <h2>Проект: {projectInfo.project.projectName}</h2>
                </div>

                <div className={"row"}>
                    <div className={"col-8"}>
                        <div className={"projectItem_info"}>
                            <div>
                                <span>{projectInfo.projectRole.roleName}</span>
                            </div>
                            <div>
                                <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"col-sm-auto"}>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <div className="btn-group mr-2" role="group" aria-label="First group">
                                <Link to={`/project/${projectInfo.project.id}/testCases`}>
                                    <button type="button" className="btn btn-secondary m-1">Сценарии тестирования</button>
                                </Link>

                                <Link to={`/project/${projectInfo.project.id}/users`}>
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