import React from 'react';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import './App.css';
import Header from './Header'
import Post from './container/Post'
// import Footer from './footer'

const store = configureStore()

function App() {
  // const TAB = ['Mac','iPad','iPhone','Watch','TV','Music', '支援服務']
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Post />
        {/* <Footer /> */}
      </div>
    </Provider>
  );
}

export default App;
