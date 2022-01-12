import React from "react";

const ProjectHeader = (props) =>{
    const {projectInfo, role} = props;

    const date = new Date(projectInfo.additionDate);
    return (
        <div className={"projectHeader container"}>
            <h2>{projectInfo.projectName}</h2>
            <div className={"projectItem_info"}>
                <div>
                    <span>{role.roleName}</span>
                </div>
                <div>
                    <span>Дата создания проекта: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</span>
                </div>
            </div>
        </div>
    )
}

export default ProjectHeader;