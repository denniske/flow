import React from "react";
import {MathInput} from "../../components/math-input";
import {REGEX_FORMULA_VARIABLE} from "../../constants";
import {Helper} from "../../util/helper";
import {Marker} from "../marker";
import {EquationHelper} from "../../util/equation-helper";


export class Node extends React.PureComponent {
    constructor(props) {
        super(props);

        const left = this.props.formula.split("=")[0];
        const right = this.props.formula.split("=")[1];

        this.state = {
            left: Helper.getVariables(left),
            right: Helper.getVariables(right),
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
        for (const element of visibleElementsWithClass) {
            const classNameNodeVar = /nodevar-([a-z-A-Z_]+)/g.exec(element.className);
            if (classNameNodeVar) {
                const variable = classNameNodeVar[1];
                const x = element.offsetLeft;
                const y = element.offsetTop;
                const width = element.offsetWidth;
                const height = element.offsetHeight;
                const centerX = x + 0.5 * width;
                const centerY = y + 0.5 * height;
                const dir = centerY > 0.5 * mathField.offsetHeight ? "down" : "up";
                markers[variable] = {
                    symbol: variable,
                    x,
                    y,
                    width,
                    height,
                    centerX,
                    centerY,
                    dir
                };
            }
        }
        return markers;
    }

    componentDidMount() {
        if (this.props.onFormulaChange) {
            this.props.onFormulaChange(this.props.id, this.props.formula, this.props.latex);
        }
    }

    handleChange(mathField, value) {
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
        }, Object.values(this.props.marker).length === 0 ? 1000 : 0);
    }

    getValueForMarker(symbol) {
        for (let parameter of Object.values(this.props.parameters)) {
            if (parameter.symbol === symbol) {
                return parameter.value;
            }
        }
        for (let variable of Object.values(this.props.variables)) {
            if (variable.symbol === symbol) {
                return variable.expr;
            }
        }
    }

    marker() {
        const markers = [];
        for (let marker of Object.values(this.props.marker)) {
            const value = this.getValueForMarker(marker.symbol);
            if (value == null) {
                continue;
            }
            markers.push(<Marker key={marker.symbol} value={value} x={marker.x} y={marker.y} dir={marker.dir} height={marker.height} centerX={marker.centerX}/>);
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
            <div className="node" style={style}>
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
}
