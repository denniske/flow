import React from "react";
import {MathWrapper} from "./math-wrapper";
import * as ReactDOM from "react-dom";


export class MathInput extends React.Component {
    componentDidMount() {
        this.changeCount = 0;

        this.mathField = new MathWrapper(this._mathContainer, {}, {
            onChange: (value, cursor) => {
                console.log("MATH INPUT ONCHANGE", this.changeCount);
                if (this.props.onChange) {
                    this.props.onChange(value, this.changeCount++, cursor);
                }
            }
        });
        this.hiddenMathField = new MathWrapper(this._hiddenMathContainer, {}, {});

        console.log("SETVALUE1");
        this.mathField.setContent(this.props.value);
    }

    render() {
        console.log("RERENDER paused=", this.props.paused);

        if (this.mathField && !this.props.paused) {
            const oldValue = this.mathField.getContent();
            this.hiddenMathField.setContent(this.props.value);
            const newValue = this.hiddenMathField.getContent();

            console.log("SETVALUE2 TRY");
            console.log(oldValue);
            console.log(newValue);

            if (oldValue !== newValue) {
                console.log("SETVALUE2");
                this.mathField.setContent(this.props.value);
            }
        }

        return <div className="mathfield">
            <div ref={(node) => this._mathContainer = ReactDOM.findDOMNode(node)}/>
            <div ref={(node) => this._hiddenMathContainer = ReactDOM.findDOMNode(node)} className="hidden"/>
        </div>;
    }
}