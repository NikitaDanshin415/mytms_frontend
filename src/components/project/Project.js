import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import NotFound from "../notFound/NotFound";
import './Project.css'
import ProjectHeader from "./projectHeader/ProjectHeader";
import ProjectTestPlanList from "./projectTestPlanList";
import ProjectTestCaseList from "./projectTestCaseList";

const Project = () => {
    const [projectId] = useState(useParams().id);


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
                /**
                 * Добавляем в состояние информацию о проекте.
                 */
                setProjectInfo({
                    additionDate: project.additionDate,
                    id: project.id,
                    projectName: project.projectName,
                    projectStatusId: project.projectStatusId
                });
                /**
                 * Добавляем в состояние информацию о роли пользователя в проекте.
                 */
                setProjectRole({
                    id: projectRole.id,
                    additionDate: projectRole.additionDate,
                });

            })
            .catch((error) => {
                console.log(error)
                setError(true)
            })
    }, [])


    if (error) {
        return <NotFound/>
    } else {

        return (
            <div>
                <ProjectHeader projectInfo={projectInfo} role={projectRole}/>
                <div className={"project_content"}>
                    <ProjectTestPlanList projectId={projectInfo.id}/>
                    <ProjectTestCaseList projectId={projectInfo.id}/>
                </div>
            </div>
        )
    }
}
export default Project;