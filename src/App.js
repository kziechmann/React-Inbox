import React, { Component } from 'react';
import Messages from './component/Messages';
import Toolbar from './component/Toolbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

class App extends Component {
  componentDidMount = async() => {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    const newState = {messages:[...messages]}
    this.setState(newState)
  }

  render() {
    return (
      <div className="container">
        <Toolbar/>
        <Messages messages={this.state? this.state.messages :""}/>
      </div>
    );
  }
}

export default App;
