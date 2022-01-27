import React from "react";

const ProjectTestCaseDetailsInfo = (props) =>{
    return(
        <div className={"container mt-4 mb-4 p-0 border-bottom border-top"}>
            <div className={"row"}>
                <h3>{props.info.name}</h3>
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