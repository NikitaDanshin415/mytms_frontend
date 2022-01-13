import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import TmsApi from "../../../../services/TmsApi";
import {useParams} from "react-router-dom";


const AddFormProjectTestPlan = (props) => {

    const [testPlanName, setTestPlanName] = useState("");
    const [testPlanDescription, setTestPlanDescription] = useState("");

    const handleChangeName = (e) => {
        setTestPlanName(e.target.value);
    }

    const handleChangeDescription = (e) => {
        setTestPlanDescription(e.target.value);
    }

    const [projectId] = useState(useParams().id);

    const api = new TmsApi();
    const addTestPlan = (e) => {
        e.preventDefault();

        const data = {
            "TestPlanName": testPlanName,
            "Description": testPlanDescription,
            "ProjectId": projectId
        }
        api.createTestPlan(data).then(r => props.handleClose());

    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление плана тестирования</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="InputProjectName">План тестирования</label>
                            <input type="email" className="form-control" id="InputProjectName"
                                   aria-describedby="emailHelp" placeholder="Введите название плана тестирования"
                                   onChange={handleChangeName}/>
                            <label htmlFor="InputProjectName">Описание</label>
                            <textarea type="email" className="form-control" id="InputProjectName"
                                   aria-describedby="emailHelp" placeholder="Введите описание плана тестирования"
                                   onChange={handleChangeDescription}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addTestPlan}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddFormProjectTestPlan;