import TmsApi from "../../services/TmsApi";
import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import ProjectHeader from "../project/projectHeader";

const TestCaseResults = () => {

    const api = new TmsApi();

    /**
     * Параметры роутинга.
     */
    const [projectId] = useState(useParams().id);
    const [testPlanId] = useState(useParams().testPlanId);
    const [testCaseId] = useState(useParams().TestCaseId);

    const [testCaseResults, setTestCaseResults] = useState([])

    useEffect(() => {
        api.getTestCaseResults(testPlanId, testCaseId)
            .then((res) => {
                setTestCaseResults(res.testCaseResultList);
            })
    }, [])


    const elements = testCaseResults.map((el) => {
        return (
            <li className={"list-group-item"} key={el.id}>
                <Link to={`/project/${projectId}/testPlan/${testPlanId}/testCase/${testCaseId}/results/${el.id}`}><h3>{el.name}</h3></Link>
                <h5>{el.testCaseResultResult.resultName}</h5>
                <div>{el.description}</div>
            </li>
        )
    })


    return (
        <div>
            <ProjectHeader/>
            <h3>Результаты тестирования</h3>
            <div className={"mb-2"}>
                <ul className={"list-group"}>
                    {elements}
                </ul>
            </div>
        </div>
    )
}

export default TestCaseResults;