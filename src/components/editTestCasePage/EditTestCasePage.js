import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import PlusBtn from "../plusBtn/PlusBtn";
import TmsApi from "../../services/TmsApi";

const EditTestCasePage = () =>{

    const [projectId] = useState(useParams().id);
    const [testCaseId] = useState(useParams().TestCaseId);
    const [redirect, setRedirect] = useState(false);

    const [testCaseInfo, setTestCaseInfo] = useState({
        testCaseName: null,
        testCaseDescription: null,
    });

    const [inputFields, setInputFields] = useState([
        {action: '', reaction: ''},
    ])



    useEffect(()=>{
        const api = new TmsApi();

        api.getTestCaseDetails(projectId, testCaseId)
            .then((res) => {
                setTestCaseInfo({
                    testCaseName: res.name,
                    testCaseDescription: res.description,
                })

                setInputFields(res.steps)
            })
    }, [])

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
                    />
                </td>
                <td>
                    <textarea
                        className={"form-control testCase_textArea_Resize"}
                        value={el.reaction}
                        onChange={e => handleChangeInput(index, e)}
                        name="reaction"
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
        setTestCaseInfo({...testCaseInfo, testCaseName: e.target.value})
    }

    const changeTestCaseDescriptionHandle = (e) =>{
        setTestCaseInfo({...testCaseInfo, testCaseDescription: e.target.value})
    }


    const sendForm = (e) => {
        e.preventDefault();

        const data = {
            id: +testCaseId,
            name: testCaseInfo.testCaseName,
            description: testCaseInfo.testCaseDescription,
            projectId:+projectId,
            steps: inputFields
        }

        const api = new TmsApi();
        api.updateTestCase(data)
            .then((res) => {
                setRedirect(true)
            })

    }

    if(redirect){
        return (
            <Navigate to={`/project/${projectId}/TestCases`}/>
        )
    }

    return(
        <div className={"container-fluid"}>
            <div className={"row"}>
                <h3>Редактирование сценария тестирования</h3>
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
                                   value={testCaseInfo.testCaseName}
                            />
                        </div>
                        <div className={"row mb-4"}>
                            <label htmlFor={"testCaseDescription"}>Описание сценария тестирования</label>
                            <textarea className={"form-control"}
                                      id={"testCaseDescription"}
                                      name={"testCaseDescription"}
                                      onChange={changeTestCaseDescriptionHandle}
                                      value={testCaseInfo.testCaseDescription}
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
            <button type="submit" onClick={sendForm} className={"btn btn-success"}>Сохранить</button>
        </div>
    )
}

export default EditTestCasePage;