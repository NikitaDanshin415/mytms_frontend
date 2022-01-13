import PlusBtn from "../../plusBtn/PlusBtn";
import ProjectTestPlanElement from "../ProjectTestPlanElement";
import React, {useState} from "react";
import AddFormProjectTestPlan from "./addFormProjectTestPlan/AddFormProjectTestPlan";

const ProjectTestPlanList = (props) => {


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

    let modalAddForm = null;
    if (props.showAddForm) {
        modalAddForm = <AddFormProjectTestPlan show={"true"} handleClose={props.setHideAddForm}/>
    }

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
            <PlusBtn
                showModal={props.showAddTestPlanForm}
            />
            {modalAddForm}
        </div>
    );
}

export default ProjectTestPlanList;

