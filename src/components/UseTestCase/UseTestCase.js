import React, {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import NotFound from "../notFound";
import TestCaseStepElement from "../testCaseStepElement/TestCaseStepElement";
import ProjectHeader from "../project/projectHeader";
import ProjectTestCaseDetailsInfo from "../projectTestCaseDetailsInfo/ProjectTestCaseDetailsInfo";
import UseTestCaseStepElement from "../UseTestCaseStepElement/UseTestCaseStepElement";
import {Button} from "react-bootstrap";

const UseTestCase = () => {
    const api = new TmsApi();

    /**
     * Параметры роутинга.
     */
    const [projectId] = useState(useParams().id);
    const [testPlanId] = useState(useParams().testPlanId);
    const [testCaseId] = useState(useParams().TestCaseId);


    const [comment, setComment] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [testCaseInfo, setTestCaseInfo] = useState(
        {
            steps: []
        }
    )

    useEffect(() => {
        api.getTestCaseDetails(projectId, testCaseId)
            .then((res) => {
                setTestCaseInfo(res)
            })
            .catch((res) => {
                return (
                    <NotFound/>
                )
            })
    }, [])


    if (testCaseInfo.steps === undefined) {
        return <NotFound/>
    }

    const setStepResult = (index, e) => {
        testCaseInfo.steps[index].testCaseResultResultId = e.target.value;
    }

    const testCaseSteps = testCaseInfo.steps.map((el, index) => {
        return (
            <UseTestCaseStepElement element={el} index={index} key={el.id} setResult={setStepResult}/>
        )
    })


    if (redirect) {
        return <Navigate to={`/project/${projectId}`}/>
    }

    const setCommentHandle = (e) => {
        setComment(e.target.value);
    }

    const saveResultHandle = (e) => {
        e.preventDefault();
        testCaseInfo.testPlanId = testPlanId;
        testCaseInfo.comment = comment;
        testCaseInfo.testCaseResultResultId = "1"

        testCaseInfo.testCaseId = testCaseId
        delete testCaseInfo.id;
        delete testCaseInfo.date;

        testCaseInfo.steps.forEach((el) => {
            if (el.testCaseResultResultId !== "1") {
                testCaseInfo.testCaseResultResultId = +el.testCaseResultResultId;
            }
        })



        testCaseInfo.steps.forEach((el) => {
            delete el.id;
            delete el.testCaseId;
        })


        console.log(testCaseInfo)

        api.addTestCaseResult(testCaseInfo)
            .then(()=>{
                setRedirect(true);
            })
    }

    return (
        <div>
            <ProjectHeader/>
            <ProjectTestCaseDetailsInfo info={testCaseInfo}/>

            <div>
                <label>Замечания</label>
                <textarea className={"form-control mb-2"} onChange={setCommentHandle}/>
            </div>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col-1">#</th>
                    <th scope="col-5">Дествие</th>
                    <th scope="col-5">Ожидаемая реакция</th>
                    <th scope="col-1">Результат</th>
                </tr>
                </thead>
                <tbody>
                {testCaseSteps}
                </tbody>
            </table>
            <Button onClick={saveResultHandle}>Сохранить</Button>
        </div>
    )
}

export default UseTestCase;