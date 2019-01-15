import React, { Component } from 'react';
import Messages from './component/Messages';
import Toolbar from './component/Toolbar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import './App.css';

class App extends Component {
  state = {}

  componentDidMount = async() => {
    const response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    const newState = {messages:[...messages]}
    this.setState(newState)
  }

  checked = (e) => {
    let newMessages = [...this.state.messages]
    newMessages[e.target.id-1]['selected'] = e.target.checked
    this.setState({messages: newMessages})
  }

  starred = (e) => {
    let newMessages = [...this.state.messages]
    let isStarred = newMessages[e.target.id-1]['starred'] || false
    isStarred? newMessages[e.target.id-1]['starred'] = false : newMessages[e.target.id-1]['starred'] = true
    this.setState({messages: newMessages})
  }

  read = (e) => {
    let newMessages = [...this.state.messages]
    newMessages[e.target.id-1]['read'] = true
    this.setState({messages: newMessages})
  }

  render() {
    return (
      <div>
      <nav></nav>
      <div className="container" style={{background: "rgba(200, 200, 200, 0.8)"}}>
        <Toolbar messages={this.state.messages}/>
        <Messages messages={this.state.messages} checked={this.checked} read={this.read} starred={this.starred}/>
      </div>
      </div>
    );
  }
}

export default App;
