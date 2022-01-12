import PlusBtn from "../../plusBtn/PlusBtn";
import TmsApi from "../../../services/TmsApi";
import ProjectTestPlanElement from "../ProjectTestPlanElement";


const ProjectTestPlanList = (props) => {


    const addTestPlan = async () => {
        props.TestPlanAddWindow(true);


        //await api.createTestPlan(props.projectId);
        props.TestPlanAddWindow(false);
    }


    if(props.testPlans===undefined){
        return null
    }

    const list = props.testPlans.map((el) => {
        let selected = false;

        if (el.id === props.selectedPlan){
            selected = true;
        }

        return (
            <li key={el.id} >
                <ProjectTestPlanElement element={el} select = {props.selectPlan} selected = {selected}/>
            </li>
        )
    })

    let modal = null;
    // if(props.TestPlanAddWindow){
    //     // modal = <AddFormProjectTestPlan show={props.TestPlanAddWindow} onHide={props.hideAddTestPlanWindow}/>
    // }

    return (
        <div className={"projectTestPlan container p0 m0"}>
            <div>
                <h2>Планы тестирования</h2>
            </div>
            <div >
                <input type={"text"}/>
            </div>
            <div >
                Всего= {list.length}
                <ul>{list}</ul>
            </div>
            <PlusBtn showModal={addTestPlan}/>
            {modal}
        </div>
    );
}

export default ProjectTestPlanList;

