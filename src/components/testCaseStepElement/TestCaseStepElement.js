const TestCaseStepElement = (props) => {

    const {element, index} = props;

    return (
        <li>
            <div className={"container"}>
                <div className={"row"}>
                    <div className={"col-1"}>
                        {index + 1}
                    </div>

                    <div className={"col-5"}>
                        {element.action}
                    </div>

                    <div className={"col-5"}>
                        {element.reaction}
                    </div>
                </div>
            </div>
        </li>
    )
}

export default TestCaseStepElement;