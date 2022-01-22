const UserListElement = (props) => {

    const selectUser = () =>{
        props.selectUser(props.user.id);
    }

    let classList = "list-group-item"

    if(props.selected){
        classList = classList + " selected"
    }

    return (
        <li onClick={selectUser} key={props.user.id} className={classList}>
            <div>
                {props.user.userName}
            </div>
        </li>
    )
}

export default UserListElement;