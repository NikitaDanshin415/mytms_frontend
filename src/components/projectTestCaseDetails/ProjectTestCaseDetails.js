import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import ProjectHeader from "../project/projectHeader";
import TestCaseStepElement from "../testCaseStepElement/TestCaseStepElement";
import ProjectTestCaseDetailsInfo from "../projectTestCaseDetailsInfo/ProjectTestCaseDetailsInfo";

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
        return (
            <TestCaseStepElement element={el} index={index} key={el.id}/>
        )
    })


    return (
        <div>
            <ProjectHeader projectInfo={projectInfo.project} role={projectInfo.projectRole}/>
            <ProjectTestCaseDetailsInfo info={testCaseInfo}/>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col-1">#</th>
                    <th scope="col-6">Дествие</th>
                    <th scope="col-5">Ожидаемая реакция</th>
                </tr>
                </thead>
                <tbody>
                    {testCaseSteps}
                </tbody>
            </table>
        </div>
    )
}

export default ProjectTestCaseDetails;