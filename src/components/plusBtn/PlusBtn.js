import React from "react";
import "./PlusBtn.css"

export default class PlusBtn extends React.Component {
    render() {
        const show = this.props.showModal;
        return (
            <div className={'plus_container'}>
                <div className={'plusBtn'} onClick={show}/>
            </div>
        )
    }
}