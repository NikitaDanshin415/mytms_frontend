import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ProjectUserListItem from "../projectUserListItem/ProjectUserListItem";
import TmsApi from "../../services/TmsApi";
import PlusBtn from "../plusBtn/PlusBtn";
import AddUserInProjectForm from "../addUserInProjectForm/AddUserInProjectForm";
import data from "bootstrap/js/src/dom/data";

const ProjectUserList = () => {
    const [projectId] = useState(useParams().id);
    const api = new TmsApi();
    const [userList, setUserList] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        api.getProjectUsers(projectId)
            .then((res) => {
                setUserList(
                    res.projectParticipantsUserList
                )
            })
    }, [showAddForm])


    const deleteProjectParticipant = (id) =>{
        const api = new TmsApi();
        api.deleteProjectParticipant(id)
            .then(()=>{
                api.getProjectUsers(projectId)
                    .then((res) => {
                        setUserList(
                            res.projectParticipantsUserList
                        )
                    })
            })
    }

    const elements = userList.map((el) => {
        return (
            <ProjectUserListItem userInfo={el} delete={deleteProjectParticipant}/>
        )
    })

    const showAddModalForm = () => {
        setShowAddForm(true);
    }

    const closeAddModalForm = () => {
        setShowAddForm(false);
    }

    let modal = null
    if(showAddForm){
        modal = <AddUserInProjectForm show={showAddForm} handleClose={closeAddModalForm}/>
    }

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
            <PlusBtn showModal = {showAddModalForm}/>
            {modal}
        </div>
    )
}

export default ProjectUserList;