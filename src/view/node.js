import React from "react";
import {MathInput} from "../components/math-input";
import {REGEX_FORMULA_VARIABLE} from "../constants";
import {Helper} from "../util/helper";
import * as ReactDOM from "react-dom";
import {Marker} from "./marker";
import {EquationHelper} from "../util/equation-helper";


export class Node extends React.PureComponent {
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
        this.handleChange2 = this.handleChange2.bind(this);
    }

    formatFormula(formula) {
        for (const assignment of Object.values(this.props.assignments)) {
            formula = formula.replace(assignment.symbol, assignment.parameter);
        }
        return EquationHelper.toLatex(formula);
    }

    formatLatexWithClasses(latex) {
        latex = latex.replace(REGEX_FORMULA_VARIABLE, (_, charBefore, variable) => {
            const className = "nodevar-" + variable.replace(/[{}]/g, "");
            return charBefore + "\\class{" + className + "}{" + variable + "}";
        });
        return latex;
    }

    findMarkers(mathField) {
        const markers = {};
        const visibleElementsWithClass = [...mathField.getElementsByClassName('mq-class')].filter(el => el.offsetParent != null);
        // console.log("array of ", visibleElementsWithClass);
        for (const element of visibleElementsWithClass) {
            const classNameNodeVar = /nodevar-([a-z-A-Z_]+)/g.exec(element.className);
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
        const markers = this.findMarkers(this._element);
        if (this.props.onFormulaChange) {
            this.props.onFormulaChange(this.props.id, this.props.formula, this.props.latex, markers);
        }
    }

    handleChange(mathField, value, count, cursor) {
        try {
            EquationHelper.toMath(value);
            if (this.props.onFormulaChange) {
                this.props.onFormulaChange(this.props.id, value, value);
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
                this.props.onFormulaChange(this.props.id, this.props.formula, value);
            }
        }
    }

    handleChange2(mathField, value) {
        setTimeout(() => {
            const markers = this.findMarkers(mathField);
            if (this.props.onFormulaMarkerChange) {
                this.props.onFormulaMarkerChange(this.props.id, markers);
            }
        });
    }

    marker() {
        const markers = [];
        for (let marker of Object.values(this.props.marker)) {
            markers.push(<Marker key={marker.symbol} value={this.getValueForMarker(marker.symbol)} x={marker.x} y={marker.y}/>);
        }
        return markers;
    }

    render() {
        // console.log("RERENDER 1");
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
                        {this.marker()}
                        <MathInput paused={this.state.error} value={this.props.latex} onChange={this.handleChange} />
                        <MathInput className="mathfield-with-classes" paused={this.state.error} value={this.formatLatexWithClasses(this.props.latex)} onChange={this.handleChange2} />
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
