import React from "react";

export default class AddBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: ""
        }
    }

    addPoint = () => {
        if(this.state.points.length > 0) {
            this.props.addPoint(this.state.points);
            this.setState({
                points: ""
            });
        }

    }

    render() {
        return (
            <React.Fragment>
                <input 
                    className="main-block__input"
                    placeholder="Insert location"
                    value={this.state.points}
                    onChange={e => this.setState({points: e.target.value})}
                    maxLength="24"
                    onKeyPress={e=> { if(e.charCode === 13) this.addPoint() } }
                />
                <button
                    className="main-block__button"
                    onClick={this.addPoint}
                >
                    Add
                </button>
            </React.Fragment> 
        )
    }
}