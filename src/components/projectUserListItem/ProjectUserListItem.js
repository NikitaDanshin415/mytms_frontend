import Helper from "../../helpers/Helper";

const ProjectUserListItem = (props) =>{

    const userInfo = props.userInfo;
    const helper = new Helper();

    const additionDate = helper.parseDate(userInfo.additionToProject);

    return(
            <tr>
                <td>{userInfo.user.userName}</td>
                <td>{userInfo.projectRole.roleName}</td>
                <td>{additionDate}</td>
            </tr>

    )
}

export default ProjectUserListItem;