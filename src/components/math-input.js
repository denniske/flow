import React from "react";
import {MathWrapper} from "./math-wrapper";
import * as ReactDOM from "react-dom";


export class MathInput extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;

        this.changeCount = 0;

        console.log("componentDidMount");

        this.mathField = new MathWrapper(this._mathContainer, {}, {
            onCursorMove: (cursor) => {
                // TODO(charlie): It's not great that there is so much coupling
                // between this keypad and the input behavior. We should wrap
                // this `MathInput` component in an intermediary component
                // that translates accesses on the keypad into vanilla props,
                // to make this input keypad-agnostic.
                // this.props.keypadElement &&
                // this.props.keypadElement.setCursor(cursor);
            },
            onChange: (value) => {
                console.log("MATH INPUT ONCHANGE", value);
                if (this.props.onChange) {
                    this.props.onChange(value, this.changeCount++);
                }
            }
        });

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

        // console.log("this.props.value", this.props.value);

        console.log("SETVALUE1");
        this.mathField.setContent(this.props.value);

        // this._container = ReactDOM.findDOMNode(this);
    }

    // componentDidUpdate(prevProps) {
    //     if (this.props.value !== prevProps.value) {
    //         console.log("MATH INPUT ONUPDATE >>> ", this.props.value);
    //         if (this.props.onUpdate) {
    //             this.props.onUpdate(this.props.value, this.changeCount++);
    //         }
    //     }
    // }

    render() {
        console.log("RERENDER", this.props.value);

        if (this.mathField) {
            console.log("SETVALUE2 TRY", this.mathField.getContent(), this.props.value);
            if (this.mathField.getContent() !== this.props.value) {
                console.log("SETVALUE2");
                this.mathField.setContent(this.props.value);
            }
        }

        return <div
            ref={(node) => {
                this._mathContainer = ReactDOM.findDOMNode(node);
            }}
        />;
    }
}