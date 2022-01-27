import {useParams} from "react-router-dom";
import {useState} from "react";
import PlusBtn from "../plusBtn/PlusBtn";

const AddTestCasePage = () => {
    const [projectId] = useState(useParams().id);

    const [inputFields, setInputFields] = useState([
        {action: '', reaction: ''},
    ])

    const fields = inputFields.map((el, index) => {
        return (
            <div key={index}>
                <label>Action</label>
                <input
                    value={el.action}
                    onChange={e => handleChangeInput(index, e)}
                    name="action"
                />
                <label>Reaction</label>
                <input
                    value={el.reaction}
                    onChange={e => handleChangeInput(index, e)}
                    name="reaction"
                />
            </div>
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

    const sendForm = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }

    return (
        <div>
            add test case to project {projectId}
            <div className={"container-fluid"}>
                <form>
                    {fields}
                </form>
                <PlusBtn showModal = {addField}/>
            </div>
        </div>
    )
}

export default AddTestCasePage;