import React from "react";
import ProjectListItem from "../projectListItem/ProjectListItem";
import "./ProjectList.css"

const ProjectList = ({projects}) => {


    const elements = projects.map((item) => {
        return (
            <li key={item.id} className={"list-group-item"}>
                <ProjectListItem project={item}/>
            </li>
        );
    })


    return (
        <ul>
            {elements}
        </ul>
    )
}

export default ProjectList