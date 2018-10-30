import React from "react";


export class Marker extends React.Component {
    render() {
        return (
            <div className="marker">
                {this.props.value}
            </div>
        );
    }
}
