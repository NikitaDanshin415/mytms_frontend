import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProjectTestCaseListItem from "../projectTestCaseListItem/ProjectTestCaseListItem";
import TmsApi from "../../services/TmsApi";

const ProjectTestCaseList = () =>{
    const [projectId] = useState(useParams().id);

    const [testCaseList, setTestCaseList] = useState([])

    useEffect(()=>{
        const api = new TmsApi();


        api.getTestCaseList(projectId)
            .then((res)=>{
                setTestCaseList(res.testCases)
            });


    }, [])


    const elements = testCaseList.map((el) => {
        return (
            <ProjectTestCaseListItem info = {el}/>
        )
    })

    return(
        <div className={"container"}>
            <h2>Сценарии тестирования</h2>
            <ul className={"list-group"}>
                {elements}
            </ul>
        </div>
    )
}

export default ProjectTestCaseList;