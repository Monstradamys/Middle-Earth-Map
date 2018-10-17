import React from "react";

class MapContainer extends React.Component {    
    componentDidMount() {
        ymaps.ready(() => {
            let LAYER_NAME = "mapLayer",
            MAP_TYPE_NAME  = "customMap",
            TILES_PATH     = "images/t/";
            
            let Layer = function () {
                let layer = new ymaps.Layer(TILES_PATH + "%z/tile-%x-%y.jpg", {
                    notFoundTile: TILES_PATH + 'notile.jpg'
                }); 
                layer.getZoomRange = function () {
                    return ymaps.vow.resolve([1, 4]);
                }

                return layer;
            };

            ymaps.layer.storage.add(LAYER_NAME, Layer);

            let mapType = new ymaps.MapType(MAP_TYPE_NAME, [LAYER_NAME]);
            ymaps.mapType.storage.add(MAP_TYPE_NAME, mapType);

            this.myMap = new ymaps.Map("map", {
                center: this.props.center,
                zoom: 2,
                type: MAP_TYPE_NAME,
                controls: []
            },
            {
                projection: new ymaps.projection.Cartesian([[-100, -100],[100, 100]], [false, false])
            });
            this.myMap.events.add('actionend', (e) => {
                this.props.setMapCenter(e.originalEvent.map.getCenter());
             });

             let a = document.getElementsByClassName("ymaps-2-1-69-copyright")[0];
             a.parentNode.removeChild(a);
        })
    }

    componentDidUpdate() {
        this.setPoints();
    }

    setPoints = () => {
        this.myMap.geoObjects.removeAll();
        this.props.points.map((point, index) => {
            let placemark = new ymaps.Placemark(
                point.center,
                {
                    balloonContent: point.name,
                    iconContent: index + 1
                },
                {
                    draggable: true
                }
            );
            placemark.events.add("dragend", (e) => {
                let coordinats = placemark.geometry.getCoordinates();
                this.props.setCoordinates(coordinats, point.id);
            })
            this.myMap.geoObjects.add(placemark);   
        });
        this.drawLines();
    }

    drawLines = () => {
        if(this.props.points.length < 2) return false;
        
        let cArr = [];
        this.props.points.map((point) => {
            cArr.push(point.center);
        });
        
        let polyline = new ymaps.Polyline(
            cArr,            
            {},
            {
                strokeWidth: 5,
                strokeStyle: "1 2",   
                strokeColor: 'e01717'         
            }
        );
        this.myMap.geoObjects.add(polyline);
    }
    
    render() {        
        return(
            <div className="map" id="map"></div>
         )
    }
}

export default MapContainer;