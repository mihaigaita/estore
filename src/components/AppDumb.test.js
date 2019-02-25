import React from 'react';
import ReactDOM from 'react-dom';
import AppDumb from './AppDumb';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppDumb />, div);
  ReactDOM.unmountComponentAtNode(div);
});
