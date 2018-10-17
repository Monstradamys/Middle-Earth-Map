import React from "react";
import Element from "./element.js"

export default class List extends React.Component {

    createList = () => {
        let arr = [];
        this.props.points.map((point) => {
            arr.push(<Element
                        key={point.id}
                        id={point.id}
                        text={point.name}
                        deletePoint={this.props.deletePoint}
                        tossPoints={this.props.tossPoints}
            />);
        })

        return arr;
    }

    handleDragOver = (e) => {
        e.preventDefault();
    }

    render() {
        return (
            <ul 
                className="main-block__list"
                onDragOver={this.handleDragOver}
            >
                {this.createList()}
            </ul>
        )
    }
}