import React from 'react';
import {Node} from "./node";
import {shallow} from "enzyme";

it('renders without crashing', () => {
    const marker = {};
    shallow(<Node formula="a+b=c" latex="a+b=c" marker={marker} />);
});
