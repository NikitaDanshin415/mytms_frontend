import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import NotFound from "../notFound/NotFound";
import './Project.css'
import ProjectHeader from "./projectHeader/ProjectHeader";
import ProjectContent from "./projectContent/ProjectContent";

const Project = () => {
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

    const [error, setError] = useState(false);


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
            setError(true)
            console.log(error)
        });
    }, [])


    if (error) {
        return <NotFound/>
    } else {
        return (
            <div className="container ">
                <ProjectHeader projectInfo={projectInfo.project} role={projectInfo.projectRole}/>
                <ProjectContent projectInfo={projectInfo}/>
            </div>
        )
    }
}
export default Project;