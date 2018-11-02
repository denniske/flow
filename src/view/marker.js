import React from "react";
import {MathInput} from "../components/math-input";
import {EquationHelper} from "../util/equation-helper";


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

        const latex = EquationHelper.toLatex(this.props.value);

        return (
            <div className="marker" style={style}>
                <div className="value">
                    <MathInput value={latex} />
                </div>
            </div>
        );
    }
}
