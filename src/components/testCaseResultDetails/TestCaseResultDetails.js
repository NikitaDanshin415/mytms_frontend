import TmsApi from "../../services/TmsApi";
import React, {useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import NotFound from "../notFound";
import TestCaseStepElement from "../testCaseStepElement/TestCaseStepElement";
import ProjectHeader from "../projectHeader";
import ProjectTestCaseDetailsInfo from "../projectTestCaseDetailsInfo/ProjectTestCaseDetailsInfo";

const TestCaseResultDetails = () => {

    const api = new TmsApi();

    /**
     * Параметры роутинга.
     */
    const [projectId] = useState(useParams().id);
    const [testPlanId] = useState(useParams().testPlanId);
    const [testCaseId] = useState(useParams().TestCaseId);
    const [resultId] = useState(useParams().resultId);

    const [TestCaseResult, setTestCaseResult] = useState({
        steps: []
    });

    useEffect(() => {
        api.getTestCaseResult(+resultId)
            .then((res) => {
                setTestCaseResult(res)
            })
            .catch(() => {
                return <NotFound/>
            })
    }, []);


    const testCaseSteps = TestCaseResult.steps.map((el, index) => {
        return (
            <TestCaseStepElement element={el} index={index} key={el.id} result={el.testCaseResultResultId}/>
        )
    })


    return (
        <div>
            <ProjectHeader/>
            <ProjectTestCaseDetailsInfo info={
                {
                    description: TestCaseResult.description,
                    name: TestCaseResult.name,
                    result: TestCaseResult.testCaseResultResult,
                }
            }/>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th scope="col-1">#</th>
                    <th scope="col-6">Дествие</th>
                    <th scope="col-5">Ожидаемая реакция</th>
                    <th scope="col-5">Результат</th>
                </tr>
                </thead>
                <tbody>
                    {testCaseSteps}
                </tbody>
            </table>
        </div>
    )
}

export default TestCaseResultDetails;