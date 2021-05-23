import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './redux/reducers/mainReducer'
import thunk from 'redux-thunk'
import Navigation from './Navigation';

const myStore = createStore(mainReducer, applyMiddleware(thunk));

export default function App() {

  return (
    <Provider store={myStore}>
      <Navigation />
    </Provider>
  );
}
