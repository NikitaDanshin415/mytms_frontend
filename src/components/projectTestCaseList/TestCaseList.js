import {useEffect, useState} from "react";
import {Link, Redirect, useParams} from "react-router-dom";
import ProjectTestCaseListItem from "../projectTestCaseListItem/ProjectTestCaseListItem";
import TmsApi from "../../services/TmsApi";
import PlusBtn from "../plusBtn/PlusBtn";

const ProjectTestCaseList = () => {
    const [projectId] = useState(useParams().id);

    const [testCaseList, setTestCaseList] = useState([])

    useEffect(() => {
        const api = new TmsApi();

        api.getTestCaseList(projectId)
            .then((res) => {
                setTestCaseList(res.testCases)
            });
    }, [])


    const elements = testCaseList.map((el) => {
        return (
            <ProjectTestCaseListItem info={el}/>
        )
    })

    return (
        <div className={"container"}>
            <h2>Сценарии тестирования</h2>
            <ul className={"list-group mb-4"}>
                {elements}
            </ul>
            <Link to={"./add"}>
                <PlusBtn/>
            </Link>

        </div>
    )
}

export default ProjectTestCaseList;