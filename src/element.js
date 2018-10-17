import React from "react";

export default class Element extends React.Component {
    
    handleDragStart = (e) => {
        e.dataTransfer.setData("Text/html", this.props.id);
    }

    handleDrop = (e)  => {
        let data = e.dataTransfer.getData("text/html");
        if(data !== this.props.id)
            this.props.tossPoints(data, this.props.id); 
        else return false;     
    }

    render() {
        return (
            <div 
                className="main-block__list-element "
                draggable
                onDragStart={this.handleDragStart}
                onDrop={this.handleDrop}
            >
                <li 
                    onClick={this.getChosenElement}
                    className="main-block__list-element-text"
                >
                    {this.props.text}
                </li>
                <button 
                    className="main-block__list-element-button"
                    onClick={e => this.props.deletePoint(this.props.id)}
                >
                    X
                </button>
            </div>

        ) 
    }
}