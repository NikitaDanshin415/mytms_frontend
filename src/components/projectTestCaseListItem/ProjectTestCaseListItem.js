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
                        <Link to={`./${props.info.id}`}>
                            <div>
                                <h3>{props.info.name}</h3>
                            </div>
                        </Link>
                    </header>

                    <div>
                        {props.info.description}
                    </div>
                    <div className={"fw-bold"}>
                        Дата добавления : {date}
                    </div>
                    <div className={"fw-bold"}>
                        Автор : {props.info.user.userName}
                    </div>
                </div>
            </div>
        </li>
    )
}
export default ProjectTestCaseListItem;