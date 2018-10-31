import React, {Component} from 'react';
import MathJax from 'react-mathjax';
import {merge} from "lodash";
import {connect} from "react-redux";
import {NodeActionCreator} from "./actions/node";
import {ArrayHelper} from "./util/array-helper";
import {Node} from "./view/node";
import {Helper} from "./util/helper";
import {Parameter} from "./view/parameter";
import {Constant} from "./view/constant";
import {EquationHelper} from "./util/equation-helper";
import {ParameterActionCreator} from "./actions/parameter";


class App extends Component {
    constructor(props) {
        super(props);
        this.handleFormulaChange = this.handleFormulaChange.bind(this);
        this.handleFormulaMarkerChange = this.handleFormulaMarkerChange.bind(this);
        setTimeout(() => {
            const actions = [
                // ParameterActionCreator.addParameter("m_e", "9.109*10^-31"),
                // ParameterActionCreator.addParameter("U_B", "10"),

                ParameterActionCreator.addParameter("a", "1"),
                ParameterActionCreator.addParameter("b", "2"),

                // ConstantActionCreator.addConstant("e", "1.602*10^-19"),


                NodeActionCreator.addNode("a+b=c", null, 250, 100),

                // NodeActionCreator.addNode("1/2 * m * (v)^2 = E_kin", 250, 100),
                // AssignmentActionCreator.addAssignment(1, "m", "m_e"),
                // AssignmentActionCreator.addAssignment(1, "v", "v_0"),
                //
                // NodeActionCreator.addNode("U * e = E_el", 250, 300),
                // AssignmentActionCreator.addAssignment(2, "U", "U_B"),
                //
                // NodeActionCreator.addNode("E_kin = E_el", 250, 200),
                //
                //
                // NodeActionCreator.addNode("F = U/d * e", 450, 100),
                // AssignmentActionCreator.addAssignment(4, "U", "U_A"),
                // NodeActionCreator.addNode("a = F/m", 650, 100),
                // AssignmentActionCreator.addAssignment(5, "a", "a_y"),
                // AssignmentActionCreator.addAssignment(5, "m", "m_e"),
                // NodeActionCreator.addNode("s = 1/2 * a * t^2", 550, 200),
                // AssignmentActionCreator.addAssignment(6, "s", "y_1"),
                // AssignmentActionCreator.addAssignment(6, "a", "a_y"),
                // AssignmentActionCreator.addAssignment(6, "t", "t_1"),
                // NodeActionCreator.addNode("t = s/v", 450, 300),
                // AssignmentActionCreator.addAssignment(7, "t", "t_1"),
                // AssignmentActionCreator.addAssignment(7, "v", "v_0"),
                // NodeActionCreator.addNode("v = a * t", 650, 300),
                // AssignmentActionCreator.addAssignment(8, "v", "v_y"),
                // AssignmentActionCreator.addAssignment(8, "a", "a_y"),
                // AssignmentActionCreator.addAssignment(8, "t", "t_1"),
                //
                // NodeActionCreator.addNode("t = s/v", 250, 500),
                // AssignmentActionCreator.addAssignment(9, "t", "t_1"),
                // AssignmentActionCreator.addAssignment(9, "s", "l"),
                // AssignmentActionCreator.addAssignment(9, "v", "v_0"),
                // NodeActionCreator.addNode("s = v * t", 450, 500),
                // AssignmentActionCreator.addAssignment(10, "s", "y_2"),
                // AssignmentActionCreator.addAssignment(10, "v", "v_y"),
                // AssignmentActionCreator.addAssignment(10, "t", "t_2"),
                //
                // NodeActionCreator.addNode("y_sch = y_1 + y_2", 250, 700),
            ];
            for (const action of actions) {
                this.props.dispatch(action);
            }
        });

        // const parameters = {"appName":"web3d",appletOnLoad:() => this.onLoadCAS(),"id":"applet1","width":435,"height":185,"showToolBar":false,"borderColor":null,"showMenuBar":false,"showAlgebraInput":false,"showResetIcon":true,"enableLabelDrags":false,"enableShiftDragZoom":true,"enableRightClick":false,"capturingThreshold":null,"showToolBarHelp":false,"errorDialogsActive":true,"useBrowserForJS":false,"ggbBase64":"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"};
        // this.applet = new window.GGBApplet(parameters, '5.0');
        // this.applet.inject('applet_container1');
    }

    onLoadCAS() {
        this.loadCAS();
    }

    triggerCAS() {
        return window.applet1 && window.applet1.evalCommandCAS && window.applet1.evalCommandCAS("2*x") === "2x";
    }

    loadCAS() {
        if (this.triggerCAS()) {
            console.log("CAS loaded.");
            this.onLoadedCAS();
            return;
        }
        setTimeout(() => this.loadCAS(), 200);
    }

    ggbCommand(command) {
        console.log(command);
        return window.applet1.evalCommand(command);
    }

    casCommand(command) {
        console.log(command);
        return window.applet1.evalCommandCAS(command);
    }

    casSolve(equations, variables) {
        const command = "Solve({" + equations.join(",") + "}, {" + variables.join(",") + "})";
        return this.casCommand(command);
    }

    formatFormula(formula, assignments) {
        for (const assignment of Object.values(assignments)) {
            formula = formula.replace(assignment.symbol, assignment.parameter);
        }
        return formula;
    }

    onLoadedCAS() {
        const equationsNodes = Object.values(this.props.nodes).map(node => this.formatFormula(node.formula, node.assignments));
        const equationsConstants = Object.values(this.props.constants).map(constant => constant.symbol + "=" + constant.value);
        const equationsParameters = Object.values(this.props.parameters).map(parameter => parameter.symbol + "=" + parameter.value);
        const equations = [...equationsNodes, ...equationsConstants, ...equationsParameters];
        const variables = ArrayHelper.unique(ArrayHelper.flatten(equations.map(equation => Helper.getVariables(equation))));

        console.log("gg = ", this.casCommand("1.602*10^-19"));

        console.time("CAS");

        for (const equation of equationsNodes) {
            const vars = ArrayHelper.unique(Helper.getVariables(equation));
            const res = this.casSolve([equation, ...equationsConstants, ...equationsParameters], vars);
            console.log("res", res);
        }
        const result = this.casSolve(equations, variables);
        console.log("result", result);

        console.timeEnd("CAS");
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
        // console.log("handleFormulaChange", id, formula, marker);
        this.props.dispatch(NodeActionCreator.updateNodeFormula(id, formula, latex, marker));
    }

    handleFormulaMarkerChange(id, marker) {
        this.props.dispatch(NodeActionCreator.updateNodeFormulaMarker(id, marker));
    }

    nodes() {
        const nodes = [];
        for (let node of Object.values(this.props.nodes)) {
            // console.log("node", node);
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
            <MathJax.Provider>
                {this.nodes()}
                <div className="constants-container">
                    {this.constants()}
                </div>
                <div className="parameters-container">
                    {this.parameters()}
                </div>
            </MathJax.Provider>
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
    // toggleTodo: id => dispatch(toggleTodo(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App)
