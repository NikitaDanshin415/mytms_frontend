const ProjectTestCaseList = (props) =>{
    return(
        <div className={"projectTestCase"}>
            <h2>Сценарии тетсирования тестирования</h2>
            <div>
                Выбран план с id : {props.selectedPlan}
            </div>
        </div>
    )
}

export default ProjectTestCaseList;