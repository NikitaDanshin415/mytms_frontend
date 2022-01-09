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
    const [testPlans, setTestPlans] = useState([]);
    const [showAddTestPlanWindow, setshowAddTestPlanWindow] = useState([false]);
    const [selectedPlan, setSelectedPlan] = useState(null)
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

        api
            .getTestPlans(projectId)
            .then((json) =>{
                setTestPlans(json.testPlans)
            })
            .catch((error) => {
                setError(true)
                console.log(error);
            })
    }, [])

    useEffect(() => {
        api
            .getTestPlans(projectId)
            .then((json) =>{
                setTestPlans(json.testPlans)
            })
            .catch((error) => {
                setError(true)
                console.log(error);
            })
    }, [showAddTestPlanWindow])



    if (error) {
        return <NotFound/>
    } else {

        return (
            <div>
                <ProjectHeader projectInfo={projectInfo.project} role={projectInfo.projectRole}/>
                <div className={"project_content"}>
                    <ProjectTestPlanList
                        projectId = {projectId}
                        testPlans={testPlans}
                        selectPlan={setSelectedPlan}
                        TestPlanAddWindow = {setshowAddTestPlanWindow}
                        selectedPlan={selectedPlan}
                    />
                    <ProjectTestCaseList selectedPlan={selectedPlan}/>
                </div>
            </div>
        )
    }
}
export default Project;