import ProjectTestPlanList from "../project/projectTestPlanList";
import ProjectTestCaseList from "../project/projectTestCaseList";
import React, {useEffect, useState} from "react";
import TmsApi from "../../services/TmsApi";
import {useParams} from "react-router-dom";

const ProjectContent = (props) => {

    const [projectId] = useState(useParams().id);
    const [testPlans, setTestPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState(null)
    const [error, setError] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showAddTestPlanCaseForm, setAddTestPlanCaseForm] = useState(false);


    const showAddTestPlanForm = () => {
        setShowAddForm(true);
    }

    const hideAddTestPlanForm = () => {
        setShowAddForm(false);
    }

    const showAddTestPlanCasesForm = () => {
        setAddTestPlanCaseForm(true);
    }

    const hideAddTestPlanCasesForm = () => {
        setAddTestPlanCaseForm(false);
    }


    let [term, setTerm] = useState("");

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

    const search = (items, term) =>{
        if(term === ""){
            return items;
        }

        return items.filter((el) =>{
            return el.testPlanName.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const visibleItems = search(testPlans, term)

    return(
        <div className={"project_content row "}>
            <div className={"col-3 p0 m0"}>
                <ProjectTestPlanList
                    testPlans={visibleItems}
                    setTerm={setTerm}

                    selectPlan={setSelectedPlan}
                    selectedPlan={selectedPlan}

                    showAddForm = {showAddForm}
                    showAddTestPlanForm = {showAddTestPlanForm}
                    setHideAddForm = {hideAddTestPlanForm}
                />
            </div>
            <div className={"col-9 p0 m0"}>
                <ProjectTestCaseList
                    selectedPlan={selectedPlan}

                    showForm={showAddTestPlanCaseForm}
                    setShowForm={showAddTestPlanCasesForm}
                    setHideForm={hideAddTestPlanCasesForm}
                />
            </div>
        </div>
    )
}

export default ProjectContent;
