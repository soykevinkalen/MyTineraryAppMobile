import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import mainReducer from './redux/reducers/mainReducer'
import thunk from 'redux-thunk'
import Navigation from './Navigation';
import { LogBox } from 'react-native';


const myStore = createStore(mainReducer, applyMiddleware(thunk));

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={myStore}>
      <Navigation />
    </Provider>
  );
}
