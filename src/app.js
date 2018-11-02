import React, {Component} from 'react';
import {merge} from "lodash";
import {connect} from "react-redux";
import {NodeActionCreator} from "./actions/node";
import {ArrayHelper} from "./util/array-helper";
import {Node} from "./view/node/node";
import {Helper} from "./util/helper";
import {Parameter} from "./view/parameter";
import {Constant} from "./view/constant";
import {EquationHelper} from "./util/equation-helper";
import {ParameterActionCreator} from "./actions/parameter";
import {VariableActionCreator} from "./actions/variable";
import {GeogebraService} from "./util/geogebra/geogebra-service";
import {AssignmentActionCreator} from "./actions/assignment";
import {ConstantActionCreator} from "./actions/constant";


class App extends Component {
    constructor(props) {
        super(props);
        this.casLoaded = false;
        this.handleFormulaChange = this.handleFormulaChange.bind(this);
        this.handleFormulaMarkerChange = this.handleFormulaMarkerChange.bind(this);
        setTimeout(() => {
            const actions = [
                // ParameterActionCreator.addParameter("m_e", "9.109*10^-31"),
                ParameterActionCreator.addParameter("U_A", "10"),
                ParameterActionCreator.addParameter("U_B", "10"),
                ParameterActionCreator.addParameter("l", "10"),
                ParameterActionCreator.addParameter("s", "10"),
                ParameterActionCreator.addParameter("d", "10"),

                // ParameterActionCreator.addParameter("a", "1"),
                // ParameterActionCreator.addParameter("c", "2"),

                // ConstantActionCreator.addConstant("e", "1.602*10^-19"),


                // NodeActionCreator.addNode("x^2=4", null, 250, 100),
                // NodeActionCreator.addNode("a+b=c", null, 250, 100),
                // NodeActionCreator.addNode("d+e=f", null, 450, 100),

                NodeActionCreator.addNode("1/2 * m * (v)^2 = E", null, 250, 100),
                NodeActionCreator.addAssignment(1, "m", "m_e"),
                NodeActionCreator.addAssignment(1, "v", "v_0"),

                NodeActionCreator.addNode("U * e = E", null, 250, 300),
                NodeActionCreator.addAssignment(2, "U", "U_B"),

                NodeActionCreator.addNode("1 = 1", null, 250, 200),


                NodeActionCreator.addNode("F = U/d * e", null, 450, 100),
                NodeActionCreator.addAssignment(4, "U", "U_A"),
                NodeActionCreator.addNode("a = F/m", null, 650, 100),
                NodeActionCreator.addAssignment(5, "a", "a_y"),
                NodeActionCreator.addAssignment(5, "m", "m_e"),
                // NodeActionCreator.addNode("s = 1/2 * a * t^2", null, 550, 200),
                // NodeActionCreator.addAssignment(6, "s", "y_1"),
                // NodeActionCreator.addAssignment(6, "a", "a_y"),
                // NodeActionCreator.addAssignment(6, "t", "t_1"),
                // NodeActionCreator.addNode("t = s/v", null, 450, 300),
                // NodeActionCreator.addAssignment(7, "t", "t_1"),
                // NodeActionCreator.addAssignment(7, "v", "v_0"),
                // NodeActionCreator.addNode("v = a * t", null, 650, 300),
                // NodeActionCreator.addAssignment(8, "v", "v_y"),
                // NodeActionCreator.addAssignment(8, "a", "a_y"),
                // NodeActionCreator.addAssignment(8, "t", "t_1"),
                //
                // NodeActionCreator.addNode("t = s/v", null, 250, 500),
                // NodeActionCreator.addAssignment(9, "t", "t_2"),
                // NodeActionCreator.addAssignment(9, "s", "l"),
                // NodeActionCreator.addAssignment(9, "v", "v_0"),
                // NodeActionCreator.addNode("s = v * t", null, 450, 500),
                // NodeActionCreator.addAssignment(10, "s", "y_2"),
                // NodeActionCreator.addAssignment(10, "v", "v_y"),
                // NodeActionCreator.addAssignment(10, "t", "t_2"),
                //
                // NodeActionCreator.addNode("y_sch = y_1 + y_2", null, 250, 700),
            ];
            for (const action of actions) {
                this.props.dispatch(action);
            }
        });

        GeogebraService.load(() => {
            this.casLoaded = true;
            this.onLoadedCAS();
        });
    }

    formatFormula(formula, assignments) {
        for (const assignment of Object.values(assignments)) {
            formula = formula.replace(assignment.symbol, assignment.parameter);
        }
        return formula;
    }

    onLoadedCAS() {
        if (!this.casLoaded) {
            return;
        }

        const equationsNodes = Object.values(this.props.nodes).map(node => this.formatFormula(node.formula, node.assignments));
        const equationsConstants = Object.values(this.props.constants).map(constant => constant.symbol + "=" + constant.value);
        const equationsParameters = Object.values(this.props.parameters).map(parameter => parameter.symbol + "=" + parameter.value);
        const equations = [...equationsNodes, ...equationsConstants, ...equationsParameters];
        const variables = ArrayHelper.unique(ArrayHelper.flatten(equations.map(equation => Helper.getVariables(equation))));

        for (const equation of equationsNodes) {
            const vars = ArrayHelper.unique(Helper.getVariables(equation));
            const res = GeogebraService.casSolve([equation, ...equationsConstants, ...equationsParameters], vars);
            console.log("res", res);
        }
        const result = GeogebraService.casSolve(equations, variables);
        console.log("result", result);

        this.props.dispatch(VariableActionCreator.setVariables(result[0]));
    }

    parameters() {
        const parameters = [];
        for (let parameter of Object.values(this.props.parameters)) {
            parameters.push(<Parameter key={parameter.symbol} symbol={parameter.symbol} value={parameter.value} onParameterChange={(symbol, value) => this.handleParameterChange(symbol, value)} />);
        }
        return parameters;
    }

    constants() {
        const constants = [];
        for (let constant of Object.values(this.props.constants)) {
            constants.push(<Constant key={constant.symbol} symbol={constant.symbol} value={constant.value} />);
        }
        return constants;
    }

    handleParameterChange(symbol, value) {
        this.setState(merge({}, this.state, {
            parameters: {
                [symbol]: {
                    value: value,
                }
            }
        }));
    }

    handleFormulaChange(id, formula, latex, marker) {
        formula = EquationHelper.toMath(formula);
        this.props.dispatch(NodeActionCreator.updateNodeFormula(id, formula, latex, marker));
    }

    handleFormulaMarkerChange(id, marker) {
        this.props.dispatch(NodeActionCreator.updateNodeFormulaMarker(id, marker));
        setTimeout(() => this.onLoadedCAS());
    }

    nodes() {
        const nodes = [];
        for (let node of Object.values(this.props.nodes)) {
            nodes.push(<Node
                key={node.id}
                id={node.id}
                formula={node.formula}
                latex={node.latex}
                assignments={node.assignments}
                marker={node.marker}
                constants={this.props.constants}
                parameters={this.props.parameters}
                variables={this.props.variables}
                x={node.x}
                y={node.y}
                onFormulaChange={this.handleFormulaChange}
                onFormulaMarkerChange={this.handleFormulaMarkerChange}
            />);
        }
        return nodes;
    }

    render() {
        return (
            <div>
                {this.nodes()}
                <div className="constants-container">
                    {/*{this.constants()}*/}
                </div>
                <div className="parameters-container">
                    {/*{this.parameters()}*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    nodes: state.nodes,
    variables: state.variables,
    constants: state.constants,
    parameters: state.parameters,
});

const mapDispatchToProps = dispatch => ({
    dispatch: dispatch,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
