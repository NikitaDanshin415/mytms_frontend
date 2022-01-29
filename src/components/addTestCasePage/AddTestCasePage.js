import {Navigate, useParams} from "react-router-dom";
import {useState} from "react";
import PlusBtn from "../plusBtn/PlusBtn";
import "./AddTestCasePage.css";
import TmsApi from "../../services/TmsApi";

const AddTestCasePage = () => {
    const [projectId] = useState(useParams().id);
    const [redirect, setRedirect] = useState(false);

    const [testCaseInfo, setTestCaseInfo] = useState({
        testCaseName: null,
        testCaseDescription: null,
    });

    const [inputFields, setInputFields] = useState([
        {action: '', reaction: ''},
    ])

    const fields = inputFields.map((el, index) => {
        return (
            <tr key={index}>
                <td>
                    {index +1 }
                </td>
                <td>
                    <textarea
                        className={"form-control testCase_textArea_Resize"}
                        value={el.action}
                        onChange={e => handleChangeInput(index, e)}
                        name="action"
                        required
                    />
                </td>
                <td>
                    <textarea
                        className={"form-control testCase_textArea_Resize"}
                        value={el.reaction}
                        onChange={e => handleChangeInput(index, e)}
                        name="reaction"
                        required
                    />
                </td>
                <td>
                    <button className={"btn  btn-close col-2"} onClick={e => removeField(index, e)}/>
                </td>
            </tr>
        );
    });


    const handleChangeInput = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.name] = e.target.value;
        setInputFields(values)
    }

    const addField = (e) => {
        e.preventDefault();
        const values = [...inputFields];
        values.push({action: '', reaction: ''});
        setInputFields(values)
    }

    const removeField = (index, e) => {
        e.preventDefault();
        const values = [...inputFields];
        values.splice(index, 1);

        if (values.length === 0) {
            values.push({action: '', reaction: ''})
        }
        setInputFields(values);

    }

    const changeTestCaseNameHandle = (e) =>{
        setTestCaseInfo({...testCaseInfo, testCaseDescription: e.target.value})
    }

    const changeTestCaseDescriptionHandle = (e) =>{
        setTestCaseInfo({...testCaseInfo, testCaseName: e.target.value})
    }


    const sendForm = (e) => {
        e.preventDefault();

        const data = {
            projectId:projectId,
            name: testCaseInfo.testCaseName,
            description: testCaseInfo.testCaseDescription,
            steps: inputFields
        }

        const api = new TmsApi();
        api.addTestCase(data)
            .then(() => {
                setRedirect(true)
            })

    }

    if(redirect){
        return (
            <Navigate to={`/project/${projectId}/TestCases`}/>
        )
    }

    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <h3>Добавление сценария тестирования</h3>
            </div>
            <div>
                <form>
                    <div className="form-group">
                        <div className={"row"}>
                            <label htmlFor={"testCaseName"}>Название сценария тестирования</label>
                            <input className={"form-control"}
                                   id={"testCaseName"}
                                   name={"testCaseName"}
                                   onChange={changeTestCaseNameHandle}
                            />
                        </div>
                        <div className={"row mb-4"}>
                            <label htmlFor={"testCaseDescription"}>Описание сценария тестирования</label>
                            <textarea className={"form-control"}
                                      id={"testCaseDescription"}
                                      name={"testCaseDescription"}
                                      onChange={changeTestCaseDescriptionHandle}
                            />
                        </div>

                        <table className="table table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">№</th>
                                <th scope="col">Action</th>
                                <th scope="col">Reaction</th>
                                <th scope="col">Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                {fields}
                            </tbody>
                        </table>
                    </div>
                </form>
                <PlusBtn showModal={addField}/>
            </div>
            <button type="submit" onClick={sendForm} className={"btn btn-success"}>Добавить</button>
        </div>
    )
}

export default AddTestCasePage;