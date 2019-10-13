import React, { Component } from 'react';

import InputContainer from './InputContainer';
import BackendChallenge from './BackendChallenge';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  render() {

    if(false){
      return <BackendChallenge />
    }

    return (
      <div className="App">

        <div className = 'App-header'>
          <div className = 'inline'>
            <h1>Stay up to date with ecommerce trends with Shopify’s newsletter</h1>
            <div className = 'divider-line'></div>
          </div>
        </div>

        {/*the input form*/}
        <InputContainer />

        <div className = 'unsubscribe'>
          <p>Unsubscribe</p>
        </div>
      </div>
    );
  }
}

export default App;
