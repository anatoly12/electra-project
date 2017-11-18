import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../app/Header.jsx';

test('Header Test', () => {
  const component = renderer.create(<Header />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
