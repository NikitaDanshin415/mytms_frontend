import './ProjectTestPlanElement.css'

const ProjectTestPlanElement = (props) =>{


    const selectItem = () =>{
        props.select(props.element.id)
    }
    let classList = "projectTestPlanElement";

    if(props.selected){
        classList += " selected"
    }

    return(
        <div className={classList} onClick={selectItem}>
            <h3>{props.element.testPlanName}</h3>
            <span>{props.element.description}</span>
        </div>
    )
}

export default ProjectTestPlanElement;