import React, {useEffect, useState} from "react";

import './Project.css'
import ProjectHeader from "./projectHeader/ProjectHeader";
import ProjectContent from "./projectContent/ProjectContent";

const Project = () => {
    return (
        <div className="container ">
            <ProjectHeader/>
            <ProjectContent/>
        </div>

    )
}
export default Project;