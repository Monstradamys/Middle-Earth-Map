import React from 'react';

import MapContainer from "./map";
import List         from "./list";
import AddBlock     from "./addblock";


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points: []
        };
        this.center =  [44, -57];
    }

    setMapCenter = (center) => {
        this.center = center;
    }

    addPoint = (data) => {
        let {points} = this.state;
        let newPoint = {name: data, center: this.center, id: Math.random().toString(16).slice(2)};
        this.setState({
            points: [...points, newPoint]
        });
    }


    setCoordinates = (coordinates, id) => {
        let points = [...this.state.points];
        points.map((point) => {
            if(point.id === id) {
                point.center = coordinates;
            }
        });
        this.setState({
            points: points
        })
    }

    deletePoint = (id) => {
        let newArr = [];
        this.state.points.map((point) => {
            if(point.id !== id) {
                newArr.push(point);
            }
        })
        this.setState({
            points: newArr
        });
    }

    tossPoint = (first, second) => {
        let firstIndex, secondIndex;
        this.state.points.map((point, index) => {
            if(point.id === first)
                firstIndex = index;
            else if (point.id === second)
                secondIndex = index;
        });
        let newArr = [...this.state.points];
        newArr[firstIndex] = this.state.points[secondIndex];
        newArr[secondIndex] = this.state.points[firstIndex];
        this.setState({
            points: newArr
        });        
    }

    render() {
        return (
            <div className="main-block">
                <AddBlock 
                    addPoint={this.addPoint}
                />
                <List
                    points={this.state.points}
                    deletePoint={this.deletePoint}
                    tossPoints={this.tossPoint}
                />
                <MapContainer 
                    points={this.state.points}
                    setCoordinates={this.setCoordinates}
                    center={this.center}
                    setMapCenter={this.setMapCenter}
                />
            </div>
        )
    }
    
};