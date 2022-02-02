const UseTestCaseStepElement = (props) => {
    const {element, index, setResult} = props;

    const elementNumber = index + 1;
    return (
        <tr>
            <td>{elementNumber}</td>
            <td>{element.action}</td>
            <td>{element.reaction}</td>
            <td>
                <select className="form-select" aria-label="Default select example" onChange={e => setResult(index, e)}>
                    <option selected></option>
                    <option value="1">Положительный</option>
                    <option value="2">Отрицательный</option>
                    <option value="3">Заблокирован</option>
                </select>
            </td>
        </tr>
    )
}

export default UseTestCaseStepElement;