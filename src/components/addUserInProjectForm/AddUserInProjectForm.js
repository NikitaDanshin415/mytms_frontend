import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import TmsApi from "../../services/TmsApi";
import {useParams} from "react-router-dom";
import ProjectUserListItem from "../projectUserListItem/ProjectUserListItem";
import UserListElement from "./userListElement/UserListElement";

const AddUserInProjectForm = (props) => {
    const api = new TmsApi();
    /**
     * id проекта.
     */
    const [projectId] = useState(useParams().id);
    /**
     * Список пользователей.
     */
    const [userList, setUserList] = useState([]);
    /**
     * Выбранный пользователь.
     */
    const [selectedUser, selectUser] = useState();
    /**
     * Введенное имя в поле.
     */
    const [userName, setUserName] = useState();


    /**
     * Изменение введенного в поле имени.
     * @param e
     */
    const changeUserName = (e) => {
        setUserName(e.target.value)
    }

    const findUser = (e) => {
        e.preventDefault();
        const data = {
            userName: userName
        }
        api.findUser(data)
            .then((res) => {
                setUserList(res.userList)
            });
    }

    const addUser = (e) => {
        e.preventDefault();
        const data = {
            projectId: +projectId,
            userId: selectedUser,
            projectRoleId: 1,
        }
        api.adduser(data)
            .then((res)=>{
                props.handleClose();
            })


    }


    const elements = userList.map((el) => {
        if (selectedUser === el.id) {
            return (<UserListElement user={el} selectUser={selectUser} key={el.id} selected/>)
        }
        return <UserListElement user={el} selectUser={selectUser} key={el.id}/>
    })


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление пользователя в проект</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="InputProjectName">Имя проекта</label>
                            <input type="text" className="form-control" id="InputProjectName"
                                   aria-describedby="emailHelp" placeholder="Введите имя пользователя"
                                   onChange={changeUserName}
                            />
                        </div>
                    </form>
                    <hr/>
                    <ul className={"list-group"}>
                        {elements}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={findUser}>
                        Найти
                    </Button>
                    <Button variant="primary" onClick={addUser}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUserInProjectForm;
