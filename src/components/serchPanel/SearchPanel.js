import React from "react";
import './SearchPanel.css'

export default class SearchPanel extends React.Component{

    state = {
        term:''
    };

    onSerchChange = (e) =>{
        const term = e.target.value;
        this.setState({
            term
        });
        this.props.onSerchChange(term);
    };

    render() {
        return(
            <div className={'form-control searchPanel border-0'}>
                <input
                    placeholder={"Serch panel"}
                    value={this.state.term}
                    onChange={this.onSerchChange}
                />
            </div>
        )
    }
}