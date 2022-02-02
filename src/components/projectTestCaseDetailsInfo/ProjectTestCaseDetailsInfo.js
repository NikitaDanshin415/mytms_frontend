const ProjectTestCaseDetailsInfo = (props) => {

    let visibleResult = null;
    if(props.info.result !== undefined){
        visibleResult = props.info.result.resultName;
    }


    return (
        <div className={"container mt-4 mb-4 p-0 border-bottom border-top"}>
            <div className={"row"}>
                <h3>{props.info.name}</h3>
                <h4>Результат : {visibleResult}</h4>
            </div>
            <div className={"row mt-3"}>
                <div className={"col-12"}>
                    <span>{props.info.description}</span>
                </div>
            </div>
        </div>
    );
}

export default ProjectTestCaseDetailsInfo;