import {useState} from "react";
import {Button, Modal} from "react-bootstrap";


const AddFormProjectTestPlan = (props) => {


    const [projectName, setProjectName] = useState("")


    const handleChange = (e) => {
        setProjectName(e.target.value);
    }

    const addProject = (e) => {
        e.preventDefault();
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

export default AddFormProjectTestPlan;