import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import TmsApi from "../../services/TmsApi";
import {useParams} from "react-router-dom";

const AddUserInProjectForm = (props) => {

    const [projectId] = useState(useParams().id);
    const [userList, setUserList] = useState();
    const [selectedUser, selectUser] = useState();
    const [userName, setUserName] = useState();

    const api = new TmsApi();

    const changeUserName = (e) => {
        setUserName(e.target.value)
    }

    const findUser = (e) => {
        e.preventDefault();

        const data = {
            projectId: "1",
            userName: userName
        }

        api.findUser(data);
    }

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
                            <input type="email" className="form-control" id="InputProjectName"
                                   aria-describedby="emailHelp" placeholder="Введите имя пользователя"
                                   onChange={changeUserName}
                            />
                            {userName}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={findUser}>
                        Найти
                    </Button>
                    <Button variant="primary">
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddUserInProjectForm;
