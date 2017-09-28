import React from 'react';
import ReactDOM from 'react-dom';
import {
  Context,
  Node,
} from '../src';

const tex = `f(x) = \\int_{-\\infty}^\\infty
    \\hat f(\\xi)\\,e^{2 \\pi i \\xi x}
    \\,d\\xi`;

const Example = () => (
  <Context>
    <div>
        This is an inline math formula: <Node inline>{'a = b'}</Node>
        And a block one:
      <Node>{tex}</Node>
    </div>
  </Context>
);

ReactDOM.render(
  <Example />,
  document.getElementById('example'),
);
