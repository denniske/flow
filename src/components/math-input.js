import React from "react";
import {MathWrapper} from "./math-wrapper";
import * as ReactDOM from "react-dom";
import shallowCompare from 'react-addons-shallow-compare';

export class MathInput extends React.Component {
    componentDidMount() {
        this.mathField = new MathWrapper(this._mathContainer, {}, {
            onChange: (mathField, value) => {
                if (this.props.onChange) {
                    this.props.onChange(mathField, value);
                }
            }
        });
        this.hiddenMathField = new MathWrapper(this._hiddenMathContainer, {}, {});
        this.mathField.setContent(this.props.value);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const propsChanged = shallowCompare(this, nextProps, nextState);
        const oldValue = this.mathField.getContent();
        this.hiddenMathField.setContent(nextProps.value);
        const newValue = this.hiddenMathField.getContent();
        return propsChanged && (oldValue !== newValue);
    }

    render() {
        // console.log("RERENDER 2");
        if (this.mathField && !this.props.paused) {
            this.mathField.setContent(this.props.value);
        }
        return <div className={"mathfield " + (this.props.className || "")}>
            <div ref={(node) => this._mathContainer = ReactDOM.findDOMNode(node)}/>
            <div ref={(node) => this._hiddenMathContainer = ReactDOM.findDOMNode(node)} className="hidden"/>
        </div>;
    }
}