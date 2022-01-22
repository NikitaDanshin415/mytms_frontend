import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import TmsApi from "../../services/TmsApi";

const AddProjectForm = (props) => {


    const [projectName, setProjectName] = useState("")


    const handleChange = (e) => {
        setProjectName(e.target.value);
    }

    const addProject = (e) => {
        e.preventDefault();
        const api = new TmsApi();

        const projectData = {
            projectName: projectName,
        }

        api.createProject(projectData)
            .then( r => props.handleClose());
    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление проекта</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="InputProjectName">Имя проекта</label>
                            <input type="email" className="form-control" id="InputProjectName"
                                   aria-describedby="emailHelp" placeholder="Введите название проекта"
                                   onChange={handleChange}/>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={addProject}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddProjectForm;