import {useEffect, useState} from "react";
import {Link, Redirect, useParams} from "react-router-dom";
import ProjectTestCaseListItem from "../projectTestCaseListItem/ProjectTestCaseListItem";
import TmsApi from "../../services/TmsApi";
import PlusBtn from "../plusBtn/PlusBtn";
import SearchPanel from "../serchPanel";

const ProjectTestCaseList = () => {
    const [projectId] = useState(useParams().id);
    const [term, setTerm] = useState("");
    const [testCaseList, setTestCaseList] = useState([])

    useEffect(() => {
        const api = new TmsApi();

        api.getTestCaseList(projectId)
            .then((res) => {
                setTestCaseList(res.testCases)
            });
    }, [])

    const search = (items, term) => {
        if (term === '') {
            return items;
        }

        return items.filter((item) => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    const onSearchChange = (term) => {
        setTerm(term);
    }


    const visibleItems = search(testCaseList, term);
    const elements = visibleItems.map((el) => {
        return (
            <ProjectTestCaseListItem info={el} key={el.id}/>
        )
    })
    return (
        <div className={"container"}>
            <h2>Сценарии тестирования</h2>
            <SearchPanel
                onSerchChange = {onSearchChange}
            />

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