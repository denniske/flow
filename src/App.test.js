import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
const MathLive = require('./util/mathlive.js');

it('renders without crashing', () => {

    console.log(MathLive.latexToAST("\\frac {63}{25}\\times  \\frac {17+15\\sqrt{5}}{7+15\\sqrt{5}}"));

    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
