import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import TmsApi from "../../services/TmsApi";
import manager from "../../helpers/manager";

const Project = () => {
    const [projectId, setProjectId] = useState(useParams().id)
    const [projectInfo, setProjectInfo] = useState({
        additionDate: null,
        id: null,
        projectName: null,
        projectStatusId: null,
    })

    const [error, setError] = useState(false);

    const api = new TmsApi();

    useEffect(() => {
        manager.getUser()
            .then(async (user) => {
                await api.getProject(projectId, user.access_token)
                    .then(async (project) => {

                        if (project.status !== 200) {
                            setError(true);
                        } else {
                            await project.json().then((r)=>{

                                setProjectInfo({
                                    additionDate: r.additionDate,
                                    id: r.id,
                                    projectName: r.projectName,
                                    projectStatusId: r.projectStatusId,
                                })
                                }

                            )

                        }
                    })


            })
    }, [])


    if (error) {
        return <h1>Not Found</h1>
    } else {

        return (

            <div>
            <pre>
                {projectInfo.projectName}<br/>
                {projectInfo.projectStatusId}<br/>
                {projectInfo.id}<br/>
                {projectInfo.additionDate}<br/>
            </pre>
            </div>
        )
    }
}
export default Project;