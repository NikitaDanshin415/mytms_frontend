const ProjectTestCaseList = (props) =>{
    return(
        <div className={"projectTestCase container"}>
            <h2>Сценарии тестирования тестирования</h2>
            <div>
                Выбран план с id : {props.selectedPlan}
            </div>
        </div>
    )
}

export default ProjectTestCaseList;