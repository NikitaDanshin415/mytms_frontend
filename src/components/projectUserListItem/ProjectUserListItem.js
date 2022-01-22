import Helper from "../../helpers/Helper";

const ProjectUserListItem = (props) =>{

    const userInfo = props.userInfo;
    const helper = new Helper();

    const additionDate = helper.parseDate(userInfo.additionToProject);

    const deleteEl = (e) =>{
        props.delete(props.userInfo.id);
    }



    return(
            <tr>
                <td>{userInfo.user.userName}</td>
                <td>{userInfo.projectRole.roleName}</td>
                <td>{additionDate}</td>
                <td onClick={deleteEl}>X</td>
            </tr>

    )
}

export default ProjectUserListItem;