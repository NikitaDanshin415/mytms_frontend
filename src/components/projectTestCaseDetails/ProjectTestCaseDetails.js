import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import ProjectHeader from "../project/projectHeader";
import TestCaseStepElement from "../testCaseStepElement/TestCaseStepElement";

const ProjectTestCaseDetails = () => {

    const [projectId] = useState(useParams().id);
    const [testCaseId] = useState(useParams().TestCaseId);
    const [testCaseInfo, setTestCaseInfo] = useState(
        {
            steps: []
        }
    )

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
        api.getTestCaseDetails(projectId, testCaseId)
            .then((res) => {
                setTestCaseInfo(res)
            })


    }, [])

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
        });
    }, [])
    const testCaseSteps = testCaseInfo.steps.map((el, index) => {
        return(
            <TestCaseStepElement element={el} index = {index}/>
        )
    })


    return (
        <div>
            <ProjectHeader projectInfo={projectInfo.project} role={projectInfo.projectRole}/>
            <span>ProjectId: {testCaseInfo.id}</span>
            <br/>
            <span>TestCaseId: {testCaseInfo.description}</span>
            <ul>
                {testCaseSteps}
            </ul>
        </div>
    )
}

export default ProjectTestCaseDetails;