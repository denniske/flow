import React from "react";


export class Marker extends React.Component {
    render() {
        const style = {
            left: this.props.x,
            top: this.props.y - 30,
        };
        return (
            <div className="marker" style={style}>
                {this.props.value}
            </div>
        );
    }
}
