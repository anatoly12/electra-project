import React from 'react';
import renderer from 'react-test-renderer';

import EventsList from '../app/EventsList.jsx';

// beforeAll(() => {
// });

test('EventsList component', () => {
  const component = renderer.create(<EventsList />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
