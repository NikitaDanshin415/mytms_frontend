const ProjectTestPlanList = (props) =>{

    return(

        <div className={"projectTestPlan"}>
            <h2>Планы тестирования : {props.projectId}</h2>
            <div>
                <input type={"text"}/>
            </div>
        </div>
    );
}

export default ProjectTestPlanList;