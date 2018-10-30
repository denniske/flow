import React from "react";
import {MathInput} from "../components/math-input";
import {EquationHelper} from "../App";
import {REGEX_FORMULA_VARIABLE} from "../constants";
import {Helper} from "../util/helper";
import * as ReactDOM from "react-dom";


export class Parameter extends React.Component {
    render() {
        return (
            <div className="parameter">
                <MathInput value={EquationHelper.toLatex(this.props.symbol+"="+this.props.value)} />
            </div>
        );
    }
}