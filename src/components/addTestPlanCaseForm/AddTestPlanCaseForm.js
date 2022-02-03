import {Button, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import TmsApi from "../../services/TmsApi";

const AddTestPlanCaseForm = (props) => {

    const [testCases, setTestCases] = useState([])

    const [selectedCasesId, setSelectedCasesId] = useState([])

    const api = new TmsApi();

    useEffect(() => {
        api.getTestCaseNotInPlan(props.projectId, props.testPlanId)
            .then((res)=>{
                setTestCases(res.testCases)
            })
    }, [])

    const selectEl = (e) =>{
        if(selectedCasesId.includes(e.target.id)){
            const elIndex = selectedCasesId.indexOf(e.target.id)
            selectedCasesId.splice(elIndex, 1)
            e.target.classList.remove("selected")
            return
        }

        selectedCasesId.push(e.target.id)
        e.target.classList.add("selected")
    }


    const elements = testCases.map((el) => {

        let classList = "list-group-item"
        if(selectedCasesId.includes(el.id)){
            classList += " selected";
        }

        return (
            <li className={classList} key = {el.id} onClick={selectEl} id={el.id}>
                {el.name}
            </li>
        )
    })

    const addClickHandle = (e) =>{
        e.preventDefault();

        const data = {
            testPlanId: props.testPlanId,
            testCasesId: selectedCasesId
        }

        api.addTestCaseInPlan(data)
            .then((res)=>{
                props.handleClose();
            })

    }

    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавление сценария тестирования</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <ul className={"list-group"}>
                            {elements}
                        </ul>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={addClickHandle}>Добавить</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddTestPlanCaseForm;