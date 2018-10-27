import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Group } from 'react-konva';
import Konva from 'konva';
import MathJax from 'react-mathjax';
import Algebrite from 'algebrite';

// console.log(Algebrite.run('x + x'));
// console.log(Algebrite.eval('x + x'));









//  when used with Math Apps Bundle, uncomment this:
//applet1.setHTML5Codebase('GeoGebra/HTML5/5.0/web/');













class Pin extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        if (this.props.anchor === "left") {
            return (
                <div className="pin pin-left">
                    <div className="connector"></div>
                    <MathJax.Node className="name" inline formula={this.props.name} />
                </div>
            );
        } else {
            return (
                <div className="pin pin-right">
                    <MathJax.Node className="name" inline formula={this.props.name} />
                    <div className="connector"></div>
                </div>
            );
        }

    }
}

class Node extends React.Component {
    constructor(props) {
        super(props);

        const formula = this.props.formula;
        const left = formula.split("=")[0];
        const right = formula.split("=")[1];

        this.state = {
            left: this.getVariables(left),
            right: this.getVariables(right),
        };
    }

    getVariables(str) {
        return str.match(/[A-Za-z_]+/g);
    }

    formatFormula(formula) {
        return formula.replace(/\*/g, " \\cdot ").replace(/([A-Za-z_\d]+)\/([A-Za-z_\d]+)/g, "\\dfrac{$1}{$2}");
    }

    variables(stateVariables, anchor) {
        const variables = [];
        for (let variable of stateVariables) {
            variables.push(<Pin key={variable} name={variable} anchor={anchor} />);
        }
        return variables;
    }

    render() {
        const style = {
            left: this.props.x,
            top: this.props.y,
        };

        return (
            <div className="node" style={style}>
                <div>
                    {this.variables(this.state.left, "left")}
                </div>
                <MathJax.Node className="math" formula={this.formatFormula(this.props.formula)} />
                <div>
                    {this.variables(this.state.right, "right")}
                </div>
            </div>
        );
    }
}


// function ggbOnInit(param) {
//     console.log("ggbOnInit");
//     if (param == "ggbApplet") {
//         // init update listeners for ggbApplet1
//         // ggbApplet.registerUpdateListener("abcListener");
//     }
// }
//
// function abcListener(objName) {
//     console.log("abcListener", objName);
// }







class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            x: 20,
            nodes: [
                {
                    id: 1,
                    formula: "1/2*m*v^2=E",
                    x: 600,
                    y: 300,
                },
                {
                    id: 2,
                    formula: "m*g*h=E",
                    x: 600,
                    y: 500,
                },
            ],
            connections: [
                {
                    id: 1,
                    startNode: {
                        id: 1,
                        variable: "E",
                    },
                    endNodeId: {
                        id: 2,
                        variable: "E",
                    },
                },
            ],
        };

        const parameters = {"appName":"web3d",appletOnLoad:() => this.onLoadCAS(),"id":"applet1","width":435,"height":185,"showToolBar":false,"borderColor":null,"showMenuBar":false,"showAlgebraInput":false,"showResetIcon":true,"enableLabelDrags":false,"enableShiftDragZoom":true,"enableRightClick":false,"capturingThreshold":null,"showToolBarHelp":false,"errorDialogsActive":true,"useBrowserForJS":false,"ggbBase64":"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"};
        this.applet = new window.GGBApplet(parameters, '5.0');
        this.applet.inject('applet_container1');

        // console.log(window.applet1.evalCommandCAS("Solve(1/x+y=0)"));
    }

    onLoadCAS() {
        this.loadCAS();
    }

    triggerCAS() {
        return window.applet1 && window.applet1.evalCommandCAS && window.applet1.evalCommandCAS("2*x") === "2x";
        // return window.applet1.evalCommandCAS("Solve(1/x+y=0)") == "2";
    }

    loadCAS() {
        if (this.triggerCAS()) {
            console.log("CAS loaded.");
            return;
        }
        setTimeout(() => this.loadCAS(), 200);
    }

    onClick(e) {
        console.log(window.applet1.evalCommandCAS("Solve(1/x+y=0)"));
        // console.log(e.clientX, e.clientY);
        // this.setState({
        //     x: e.clientX,
        // });
    }

    onMouseMove(e) {
        // console.log(e.clientX, e.clientY);
        // this.setState({
        //     x: e.clientX,
        // });
    }

    nodes() {
        const nodes = [];
        for (let node of this.state.nodes) {
            nodes.push(<Node key={node.id} formula={node.formula} x={node.x} y={node.y} />);
        }
        return nodes;
    }

    render() {
        return (
            <MathJax.Provider>
            <div onMouseMove={(e) => this.onMouseMove(e)} onClick={(e) => this.onClick(e)}>
                {this.nodes()}
            </div>
            </MathJax.Provider>
        );
    }
}















/*
render() {
    return (
        <div onMouseMove={(e) => this.onMouseMove(e)}>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Text text="Try click on rect" />
                    <ColoredRect />
                </Layer>
            </Stage>
        </div>
    );
}
*/

/*
<Rect
    x={this.state.x}
    y={220}
    width={50}
    height={50}
    fill={'green'}
    shadowBlur={5}
/>
*/

class ColoredRect extends React.Component {
    state = {
        color: 'green'
    };
    handleClick = () => {
        this.setState({
            color: Konva.Util.getRandomColor()
        });
    };
    render() {
        return (
            <Group>
                <Rect
                    x={20}
                    y={20}
                    width={50}
                    height={50}
                    fill={this.state.color}
                    shadowBlur={5}
                    onClick={this.handleClick}
                />
                <Rect
                    x={200}
                    y={20}
                    width={50}
                    height={50}
                    fill={this.state.color}
                    shadowBlur={5}
                    onClick={this.handleClick}
                />
            </Group>
        );
    }
}

export default App;
