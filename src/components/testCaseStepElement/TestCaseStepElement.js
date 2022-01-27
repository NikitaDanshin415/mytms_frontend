const TestCaseStepElement = (props) => {

    const {element, index} = props;

    return (

    <tr>
        <td >{index + 1}</td>
        <td>{element.action}</td>
        <td>{element.reaction}</td>
    </tr>
    )
}

export default TestCaseStepElement;