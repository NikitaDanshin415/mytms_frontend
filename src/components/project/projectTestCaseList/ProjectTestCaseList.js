import React, {useEffect, useState} from "react";
import TmsApi from "../../../services/TmsApi";
import {Link, useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import Helper from "../../../helpers/Helper";
import PlusBtn from "../../plusBtn/PlusBtn";
import AddTestPlanCaseForm from "../../addTestPlanCaseForm/AddTestPlanCaseForm";

const ProjectTestCaseList = (props) => {
    const [projectId] = useState(useParams().id);
    const [testPlanCases, setTestPlanCases] = useState(
        {"testPlanCases": []}
    );

    const api = new TmsApi();
    const helper = new Helper();

    useEffect(() => {
        api.getTestPlanCases([props.selectedPlan])
            .then((res) => {
                setTestPlanCases(res)
            })
    }, [props.selectedPlan, props.showForm] )

    const elements = testPlanCases.testPlanCases.map((el) => {
        let classList = "";

        switch (el.testCaseLastResult) {
            case "Положительный":
                classList = "text-success"
                break;
            case "Отрицательный":
                classList = "text-danger"
                break;
            case "Блокирован":
                classList = "text-warning"
                break;
        }

        return (
            <li key={el.id} className="list-group-item">
                <h5 className={"fw-bold"}>{el.testCase.name}</h5>
                <h5>Последний результат: <span className={classList}>{el.testCaseLastResult}</span></h5>
                <div>{helper.parseDate(el.testCaseLastResultDt)}</div>
                <div>{el.testCase.description}</div>
                <Link to={`/project/${projectId}/testPlan/${props.selectedPlan}/testCase/${el.testCase.id}/use`}>
                    <Button className={"m-2"}>Использовать</Button>
                </Link>
                <Link to={`/project/${projectId}/testPlan/${props.selectedPlan}/testCase/${el.testCase.id}/results`}>
                    <Button className={"m-2"}>Просмотр результатов</Button>
                </Link>
            </li>
        )
    });

    let modalAddForm = null;


    if (props.showForm) {
        modalAddForm = <AddTestPlanCaseForm
            show={true}
            handleClose={props.setHideForm}
            projectId={projectId}
            testPlanId={props.selectedPlan}
        />
    }

    let addTestCaseBtn = null
    if (props.selectedPlan !== null) {
        addTestCaseBtn = <PlusBtn showModal={props.setShowForm}/>;
    }

    return (
        <div className={"container"}>
            <h2>Сценарии тестирования</h2>
            <ul className={"list-group mb-2"}>
                {elements}
            </ul>
            {addTestCaseBtn}
            {modalAddForm}
        </div>
    )
}

export default ProjectTestCaseList;