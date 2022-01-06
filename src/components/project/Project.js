import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import NotFound from "../notFound/NotFound";

const Project = () => {
    const [projectId] = useState(useParams().id);

    const [projectParticipantInfo, setParticipantInfo] = useState({
        additionDate: null,
        id: null,
    });

    const [projectInfo, setProjectInfo] = useState({
        additionDate: null,
        id: null,
        projectName: null,
        projectStatusId: null
    });

    const [projectRole, setProjectRole] = useState({
        id: null,
        roleName: null,
    });

    const [error, setError] = useState(false);

    const api = new TmsApi();

    useEffect(() => {
        api
            .getProject(projectId)
            .then((json) => {
                let {project, projectRole} = json;

                setProjectInfo({
                    additionDate: project.additionDate,
                    id: project.id,
                    projectName: project.projectName,
                    projectStatusId: project.projectStatusId
                })
                setProjectRole({
                    id: projectRole.id,
                    roleName: projectRole.roleName,
                })
            })
            .catch((res) => {
                setError(true)
            })
    }, [])


    if (error) {
        return <NotFound/>
    } else {
        const date = new Date(projectInfo.additionDate);
        return (
            <div className={"projectItem"}>

                <h2>{projectInfo.projectName}</h2>

                <div className={"projectItem_info"}>
                    <div>
                        <span>{projectInfo.roleName}</span>
                    </div>
                    <div>
                        <span>{projectRole.roleName}</span>
                    </div>
                    <div>
                        <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</span>
                    </div>
                </div>
            </div>

        )
    }
}
export default Project;