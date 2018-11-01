import React from "react";


const MARKER_HEIGHT = 23;

export class Marker extends React.Component {
    render() {
        const style = {
            left: this.props.centerX,
        };

        if (this.props.dir === "up") {
            style.top = this.props.y - 20 - MARKER_HEIGHT;
        }
        if (this.props.dir === "down") {
            style.top = this.props.y + this.props.height + 20;
        }

        return (
            <div className="marker" style={style}>
                <div className="value">
                    {this.props.value}
                </div>
            </div>
        );
    }
}
