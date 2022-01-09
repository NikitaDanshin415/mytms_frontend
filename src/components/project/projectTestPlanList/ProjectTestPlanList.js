import PlusBtn from "../../plusBtn/PlusBtn";
import TmsApi from "../../../services/TmsApi";
import ProjectTestPlanElement from "../ProjectTestPlanElement";

const ProjectTestPlanList = (props) => {

    const api = new TmsApi();

    const addTestPlan = async () => {
        props.TestPlanAddWindow(true);
        await api.createTestPlan(props.projectId);
        props.TestPlanAddWindow(false);
    }


    let list = props.testPlans.map((el) => {
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


    return (
        <div className={"projectTestPlan"}>
            <div>
                <h2>Планы тестирования</h2>
            </div>
            <div>
                <input type={"text"}/>
            </div>
            <div>
                Всего= {list.length}
                <ul>{list}</ul>
            </div>
            <PlusBtn showModal={addTestPlan}/>
        </div>
    );
}

export default ProjectTestPlanList;

