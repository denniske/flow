import React from "react";
import {MathInput} from "../components/math-input";
import {REGEX_FORMULA_VARIABLE} from "../constants";
import {Helper} from "../util/helper";
import * as ReactDOM from "react-dom";
import {Marker} from "./marker";
import {EquationHelper} from "../util/equation-helper";


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
            error: null,
        };
        this.handleChange = this.handleChange.bind(this);
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

    findMarkers() {
        const markers = {};
        const visibleElementsWithClass = [...this._element.getElementsByClassName('mq-class')];//.filter(el => el.offsetParent != null);
        // console.log("array of ", visibleElementsWithClass);
        for (const element of visibleElementsWithClass) {
            const classNameNodeVar = /nodevar-([a-z-A-Z_])/g.exec(element.className);
            if (classNameNodeVar) {
                const variable = classNameNodeVar[1];
                // console.log("pos of " + variable, element.offsetLeft, element.offsetTop);
                markers[variable] = {
                    symbol: variable,
                    x: element.offsetLeft,
                    y: element.offsetTop,
                }
            }
        }
        return markers;
    }

    componentDidMount() {
        // console.log("mount", this.props.formula);
        const markers = this.findMarkers();
        if (this.props.onFormulaChange) {
            this.props.onFormulaChange(this.props.id, this.props.formula, this.props.latex, markers);
        }
    }

    handleChange(value, count, cursor) {
        // console.log("VALUE when element not checked", value, "count=", count);
        if (this._element == null) return;
        // console.log("VALUE BEFORE", value, "count=", count);

        const markers = this.findMarkers();

        try {
            EquationHelper.toMath(value);
            // console.log("RETURN", count, this.formatFormula(this.props.formula), value);
            if (count < 1 || this.formatFormula(this.props.formula) === value) {
                return;
            }
            // console.log("onFormulaChange", value);
            if (this.props.onFormulaChange) {
                this.props.onFormulaChange(this.props.id, value, value, markers);
            }
            if (this.state.error) {
                this.setState({
                    error: null,
                });
            }
        } catch (error) {
            console.log(error.message);
            if (error.message.includes("Parser error")) {
                this.setState({
                    error: error.message
                });
            }
            if (this.props.onFormulaChange) {
                this.props.onFormulaChange(this.props.id, this.props.formula, value, markers);
            }
        }
    }

    marker() {
        const markers = [];
        for (let marker of Object.values(this.props.marker)) {
            markers.push(<Marker key={marker.symbol} value={this.getValueForMarker(marker.symbol)} x={marker.x} y={marker.y}/>);
        }
        return markers;
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
                ref={(node) => this._element = ReactDOM.findDOMNode(node)}
            >
                <div className="math">
                    <div className="formula-container">
                        <MathInput paused={this.state.error} value={this.props.latex} onChange={this.handleChange} />
                        {/*<MathInput paused={this.state.error} value={this.formatFormulaWithClasses(this.props.formula)} onChange={this.handleChange} />*/}
                        {/*{this.marker()}*/}
                    </div>
                    <pre className="error">{this.state.error}</pre>
                </div>
            </div>
        );
    }

    getValueForMarker(symbol) {
        for (let parameter of Object.values(this.props.parameters)) {
            if (parameter.symbol === symbol) {
                return parameter.value;
            }
        }
    }
}
