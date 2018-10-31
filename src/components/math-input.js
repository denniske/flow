import React from "react";
import {MathWrapper} from "./math-wrapper";
import * as ReactDOM from "react-dom";


export class MathInput extends React.Component {
    componentDidMount() {
        this.changeCount = 0;

        this.mathField = new MathWrapper(this._mathContainer, {}, {
            onChange: (value) => {
                console.log("MATH INPUT ONCHANGE", this.changeCount);
                if (this.props.onChange) {
                    this.props.onChange(value, this.changeCount++);
                }
            }
        });
        this.hiddenMathField = new MathWrapper(this._hiddenMathContainer, {}, {});

        // NOTE(charlie): MathQuill binds this handler to manage its
        // drag-to-select behavior. For reasons that I can't explain, the event
        // itself gets triggered even if you tap slightly outside of the
        // bound container (maybe 5px outside of any boundary). As a result, the
        // cursor appears when tapping at those locations, even though the input
        // itself doesn't receive any touch start or mouse down event and, as
        // such, doesn't focus itself. This makes for a confusing UX, as the
        // cursor appears, but the keypad does not and the input otherwise
        // treats itself as unfocused. Thankfully, we don't need this behavior--
        // we manage all of the cursor interactions ourselves--so we can safely
        // unbind the handler.
        // this.mathField.mathField.__controller.container.unbind(
        //     'mousedown.mathquill'
        // );

        // NOTE(charlie): MathQuill uses this method to do some layout in the
        // case that an input overflows its bounds and must become scrollable.
        // As it causes layout jank due to jQuery animations of scroll
        // properties, we disable it unless it is explicitly requested (as it
        // should be in the case of a fixed-width input).
        // if (!this.props.scrollable) {
        //     this.mathField.mathField.__controller.scrollHoriz = function () {
        //     };
        // }

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