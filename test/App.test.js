import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from '../reducers.jsx';
import App from '../app/App.jsx';

test('Test App component', () => {

  const store = createStore(reducers);

  const component = renderer.create(<Provider store={store}>
                                      <App />
                                    </Provider>);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
