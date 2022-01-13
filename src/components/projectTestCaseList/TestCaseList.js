import {useState} from "react";
import {useParams} from "react-router-dom";

const ProjectTestCaseList = () =>{
    const [projectId] = useState(useParams().id);
    return(
        <h2>TestCaseList | id : {projectId}</h2>
    )
}

export default ProjectTestCaseList;