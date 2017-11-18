import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { configure } from 'enzyme';
import { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import reducers from '../reducers.jsx';
import App from '../app/App.jsx';

test('Test App component', () => {
  const store = createStore(reducers);

  const component = renderer.create(<Provider store={store}>
                                      <App />
                                    </Provider>);
  // Configure Enzyme before using it
  //configure({ adapter: new Adapter() });
  //const component = shallow(<App />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
