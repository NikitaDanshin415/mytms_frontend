import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProjectUserListItem from "../projectUserListItem/ProjectUserListItem";
import TmsApi from "../../services/TmsApi";

const ProjectUserList = () => {
    const [projectId] = useState(useParams().id);
    const api = new TmsApi();
    const [userList, setUserList] = useState([]);


    useEffect(() => {
        api.getProjectUsers(projectId)
            .then((res) => {
                setUserList(
                    res.projectParticipantsUserList
                )
            })
    }, [])


    const elements = userList.map((el) => {
        return (
            <ProjectUserListItem userInfo={el}/>
        )
    })

    return (
        <div className={"container"}>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Пользователь</th>
                    <th scope="col">Роль в проекте</th>
                    <th scope="col">Дата добавления</th>
                </tr>
                </thead>
                <tbody>
                    {elements}
                </tbody>

            </table>
        </div>
    )
}

export default ProjectUserList;