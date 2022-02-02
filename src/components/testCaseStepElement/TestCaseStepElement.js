const TestCaseStepElement = (props) => {

    const {element, index} = props;

    if(props.result !== undefined){

        let visibleResult = "";

        switch (props.result){
            case 1:
                visibleResult = "Положительный"
                break
            case 2:
                visibleResult = "Отрицательный"
                break
            case 3:
                visibleResult = "Блокирован"
                break
        }

        return (
            <tr>
                <td>{index + 1}</td>
                <td>{element.action}</td>
                <td>{element.reaction}</td>
                <td>{visibleResult}</td>
            </tr>
        )
    }

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{element.action}</td>
            <td>{element.reaction}</td>
        </tr>
    )
}

export default TestCaseStepElement;