import React from "react";
import {MathWrapper} from "./math-wrapper";
import * as ReactDOM from "react-dom";


export class MathInput extends React.Component {
    componentDidMount() {
        this.changeCount = 0;

        this.mathField = new MathWrapper(this._mathContainer, {}, {
            onCursorMove: (cursor) => {
                // TODO(charlie): It's not great that there is so much coupling
                // between this keypad and the input behavior. We should wrap
                // this `MathInput` component in an intermediary component
                // that translates accesses on the keypad into vanilla props,
                // to make this input keypad-agnostic.
                // this.props.keypadElement &&
                // this.props.keypadElement.setCursor(cursor);
                console.log("CURSOR >>>", cursor);
                if (this.props.onCursorMove) {
                    this.props.onCursorMove(cursor);
                }
            },
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

        if (this.props.cursor) {
            console.log("SET SET SET", this.props.cursor.left, this.props.cursor.top);
            this.mathField.setCursorPosition(this.props.cursor.left, this.props.cursor.top, null);
        }

        return <div className="mathfield">
            <div ref={(node) => this._mathContainer = ReactDOM.findDOMNode(node)}/>
            <div ref={(node) => this._hiddenMathContainer = ReactDOM.findDOMNode(node)} className="hidden"/>
        </div>;
    }
}