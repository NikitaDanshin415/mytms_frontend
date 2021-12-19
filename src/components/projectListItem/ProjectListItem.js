import React from "react";
import "./ProjectListItem.css";

export default class ProjectListItem extends React.Component{

    render() {

        const {project} = this.props;


        return(
            <div className={"projectItem"}>
                <h2>{project.projectName}</h2>

                <div className={"projectItem_info"}>
                    <span>Администратор</span>
                    <span>Количество сценариев: </span>
                    <span>Пользователей: </span>
                    <span>Активных планов тестирования: </span>
                    <span>Закрытых планов тестирования: </span>
                </div>

            </div>
        )
    }
}