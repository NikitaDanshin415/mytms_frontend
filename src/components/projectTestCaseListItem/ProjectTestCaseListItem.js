import Helper from "../../helpers/Helper";
import {Link} from "react-router-dom";

const ProjectTestCaseListItem = (props) => {

    const helper = new Helper();

    const date = helper.parseDate(props.info.date)

    return (
        <li className={"list-group-item"} key={props.info.id}>
            <div className={"container"}>
                <div className={"row"}>

                    <header>
                        <Link to={`./${props.info.id}`}>TestCase</Link>
                    </header>
                    <div>
                        Id : {props.info.id}
                    </div>
                    <div>
                        Описание : {props.info.description}
                    </div>
                    <div>
                        Дата добавления : {date}
                    </div>
                    <div>
                        Автор : {props.info.user.userName}
                    </div>
                </div>
            </div>
        </li>
    )
}
export default ProjectTestCaseListItem;