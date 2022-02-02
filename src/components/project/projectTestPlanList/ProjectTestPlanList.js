import PlusBtn from "../../plusBtn/PlusBtn";
import ProjectTestPlanElement from "../ProjectTestPlanElement";
import React, {useState} from "react";
import AddFormProjectTestPlan from "./addFormProjectTestPlan/AddFormProjectTestPlan";
import SearchPanel from "../../serchPanel";

const ProjectTestPlanList = (props) => {

    if(props.testPlans===undefined){
        return null
    }

    const list = props.testPlans.map((el) => {
        let selected = false;

        if (el.id === props.selectedPlan){
            selected = true;
        }

        let classList = "list-group-item";

        if(selected){
            classList += " selected"
        }


        return (
            <li key={el.id} className={classList} >
                <ProjectTestPlanElement element={el} select = {props.selectPlan} selected = {selected}/>
            </li>
        )
    })

    let modalAddForm = null;
    if (props.showAddForm) {
        modalAddForm = <AddFormProjectTestPlan show={"true"} handleClose={props.setHideAddForm}/>
    }

    const onSearchChange = (term) => {
        props.setTerm(term);
    }



    return (
        <div className={"projectTestPlan container p0 m0"}>
            <div>
                <h2>Планы тестирования</h2>
            </div>
            <div >
                <SearchPanel
                    onSerchChange={onSearchChange}
                />
            </div>
            <div className={"mb-2"}>
                Всего= {list.length}
                <ul className={"list-group"}>
                    {list}
                </ul>
            </div>
            <PlusBtn
                showModal={props.showAddTestPlanForm}
            />
            {modalAddForm}
        </div>
    );
}

export default ProjectTestPlanList;

