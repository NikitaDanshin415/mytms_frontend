import ProjectTestPlanList from "../projectTestPlanList";
import ProjectTestCaseList from "../projectTestCaseList";
import React, {useEffect, useState} from "react";
import TmsApi from "../../../services/TmsApi";
import {useParams} from "react-router-dom";

const ProjectContent = (props) => {

    const [projectId] = useState(useParams().id);
    const [testPlans, setTestPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [error, setError] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);


    const showAddTestPlanForm = () => {
        setShowAddForm(true);
    }

    const hideAddTestPlanForm = () => {
        setShowAddForm(false);
    }


    const api = new TmsApi();
    useEffect(() => {
        api
            .getTestPlans(projectId)
            .then((json) => {
                setTestPlans(json.testPlans)
            })
            .catch((error) => {
                setError(true)
                console.log(error);
            })
    }, [showAddForm])

    return(
        <div className={"project_content row "}>
            <div className={"col-3 p0 m0"}>
                <ProjectTestPlanList
                    testPlans={testPlans}

                    selectPlan={setSelectedPlan}
                    selectedPlan={selectedPlan}

                    showAddForm = {showAddForm}
                    showAddTestPlanForm = {showAddTestPlanForm}
                    setHideAddForm = {hideAddTestPlanForm}
                />
            </div>
            <div className={"col-9 p0 m0"}>
                <ProjectTestCaseList selectedPlan={selectedPlan}/>
            </div>

        </div>
    )
}

export default ProjectContent;
