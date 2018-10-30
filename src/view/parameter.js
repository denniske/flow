import React from "react";
import {MathInput} from "../components/math-input";
import {EquationHelper} from "../util/equation-helper";


export class Parameter extends React.Component {
    render() {
        return (
            <div className="parameter">
                <MathInput value={EquationHelper.toLatex(this.props.symbol+"="+this.props.value)} />
            </div>
        );
    }
}