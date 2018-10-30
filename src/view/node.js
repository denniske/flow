import React from "react";
import {MathInput} from "../components/math-input";
import {EquationHelper} from "../App";
import {REGEX_FORMULA_VARIABLE} from "../constants";
import {Helper} from "../util/helper";
import * as ReactDOM from "react-dom";
import {Marker} from "./marker";


export class Node extends React.Component {
    constructor(props) {
        super(props);

        const formula = this.props.formula;
        const left = formula.split("=")[0];
        const right = formula.split("=")[1];

        this.state = {
            left: Helper.getVariables(left),
            right: Helper.getVariables(right),
            mode: "view",
            inputFormula: formula,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
    }

    formatFormula(formula) {
        for (const assignment of Object.values(this.props.assignments)) {
            formula = formula.replace(assignment.symbol, assignment.parameter);
        }
        return EquationHelper.toLatex(formula);
    }

    formatFormulaWithClasses(formula) {
        let latex = this.formatFormula(formula);

        const constants = Object.values(this.props.constants).map(c => c.symbol);

        latex = latex.replace(REGEX_FORMULA_VARIABLE, variable => {
            if (constants.includes(variable)) {
                return "\\textcolor{#FF0000}{" + variable + "}";
            }
            return variable;
        });
        const variables = Helper.getVariables(formula);
        latex = latex.replace(REGEX_FORMULA_VARIABLE, variable => {
            if (variables.includes(variable.replace(/[{}]/g, ""))) {
                const className = "nodevar-" + variable.replace(/[{}]/g, "");
                // const className = "nodevar";
                return "\\class{" + className + "}{" + variable + "}";
            }
            return variable;
        });

        return latex;
    }

    edit() {
        this.setState({
            mode: "edit",
        });
    }

    save() {
        this.setState({
            mode: "view",
        });
        this.props.onFormulaChange(this.props.id, this.state.inputFormula);
    }

    handleChange2(value, count) {
        console.log("HANDLE 2 ---------------------------------->", value);
        // this.props.onFormulaChange(this.props.id, value);


        console.log("this._element", this, this._element, value);



    }
    handleChange3(value, count) {
        console.log("HANDLE 3 ---------------------------------->", value);
    }

    handleChange(value, count) {

        console.log("this._element zzzzzz", this, this._element, value);


        if (this._element == null) return;

        let formula = EquationHelper.toMath(value);
        for (const assignment of Object.values(this.props.assignments)) {
            formula = formula.replace(assignment.symbol, assignment.parameter);
        }
        console.log("FORMULA", formula);
        const variables = Helper.getVariables(formula);
        console.log("variables", variables);

        const marker = {};
        for (const variable of variables) {
            const el = this._element.getElementsByClassName('nodevar-' + variable);
            if (el.length === 1) {
                console.log("pos of " + variable, el[0], el[0].offsetLeft);
                marker[variable] = {
                    symbol: variable,
                    x: el[0].offsetLeft,
                    y: el[0].offsetTop,
                }
            }
        }

        console.log("RETURN", count, this.formatFormula(this.props.formula), value);
        if (count < 1 || this.formatFormula(this.props.formula) === value) {
            return;
        }

        console.log("onFormulaChange", value);
        if (this.props.onFormulaChange) {
            this.props.onFormulaChange(this.props.id, value, marker);
        }

        // this.setState({
        //     inputFormula: value,
        // });
    }

    marker() {
        const marker = [];
        for (let marker of Object.values(this.props.marker)) {
            marker.push(<Marker key={marker.symbol} value={marker.symbol} x={marker.x} y={marker.y} />);
        }
        return marker;
    }

    render() {
        const style = {
            left: this.props.x,
            top: this.props.y,
        };

        return (
            <div
                className="node"
                style={style}
                ref={(node) => {this._element = ReactDOM.findDOMNode(node); console.log("<<< set element", node, ReactDOM.findDOMNode(node));}}
            >
                <div className="math">
                    <div className="formula-container">
                        <MathInput value={this.formatFormulaWithClasses(this.props.formula)} onChange={this.handleChange} />
                        {this.marker()}
                    </div>
                </div>
            </div>
        );
    }
}
