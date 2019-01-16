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
    let newState = {messages:[...messages]}
    newState.messages.forEach(message => {newState.messages[message.id-1]['selected'] = false})
    this.setState(newState)
  }

  updateMessage = async(data) => {
    await fetch('http://localhost:8082/api/messages',{
      method: 'PATCH',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    let response = await fetch('http://localhost:8082/api/messages')
    const messages = await response.json()
    let newState = {messages:[...messages]}
    newState.messages.forEach(message => {newState.messages[message.id-1]['selected'] = this.state.messages[message.id-1]['selected']})
    this.setState(newState)
  }

  select = (e) => {
    let newMessages = [...this.state.messages]
    newMessages[e.target.id-1]['selected'] = e.target.checked
    this.setState({messages: newMessages})
  }

  selectAll = (e) => {
    let newMessages = [...this.state.messages]
    newMessages.forEach(message => message['selected'] = true)
    this.setState({messages: newMessages})
  }

  unSelectAll = (e) => {
    let newMessages = [...this.state.messages]
    newMessages.forEach(message => message['selected'] = false)
    this.setState({messages: newMessages})
  }

  starred = async(e) => {
    let newMessages = [...this.state.messages]
    let isStarred = newMessages[e.target.id-1]['starred'] || false
    isStarred? newMessages[e.target.id-1]['starred'] = false : newMessages[e.target.id-1]['starred'] = true
    await this.updateMessage({
      messageIds: [e.target.id],
      command: 'star',
      star: !isStarred
    })
  }

  read = async(e) => {
    let newMessages = [...this.state.messages]
    newMessages[e.target.id-1]['read'] = true
    await this.updateMessage({
      messageIds: [e.target.id],
      command: 'read',
      read: newMessages[e.target.id-1]['read']
    })
  }

  readSelected = () =>{
    this.state.messages.filter(message=> message.selected)
                       .forEach(async message=>{
                         let newMessages = [...this.state.messages]
                         newMessages[message.id-1]['read'] = true
                         await this.updateMessage({
                           messageIds: [message.id],
                           command: 'read',
                           read: true
                         })
                       })
  }

  unReadSelected = () =>{
    this.state.messages.filter(message=> message.selected)
                       .forEach( message=>{
                         let newMessages = [...this.state.messages]
                         newMessages[message.id-1]['read'] = false
                         this.updateMessage({
                           messageIds: [message.id],
                           command: 'read',
                           read: false
                         })
                       })
  }

  applyLabel = (e) =>{
      this.state.messages.filter(message=> message.selected)
                         .forEach(async message=>{
                           let newMessages = [...this.state.messages]
                           let labels = newMessages[message.id-1]['labels']
                           if (!labels.includes(e.target.value)){
                             await this.updateMessage({
                               messageIds: [message.id],
                               command: 'addLabel',
                               label: e.target.value
                             })
                           }
                         })
  }

  removeLabel = (e) =>{
      this.state.messages.filter(message=> message.selected)
                         .forEach(async message=>{
                           let newMessages = [...this.state.messages]
                           let labels = newMessages[message.id-1]['labels']
                           if (labels.includes(e.target.value)){
                             await this.updateMessage({
                               messageIds: [message.id],
                               command: 'removeLabel',
                               label: e.target.value
                             })
                           }
                         })
  }


  render() {
    return (
      <div>
      <nav></nav>
      <div className="container" style={{background: "rgba(200, 200, 200, 0.8)"}}>
        <Toolbar messages={this.state.messages} unReadAll={this.unReadSelected} readAll={this.readSelected} selectAll={this.selectAll} unSelectAll={this.unSelectAll} applyLabel={this.applyLabel} removeLabel={this.removeLabel}/>
        <Messages messages={this.state.messages} select={this.select} read={this.read} starred={this.starred}/>
      </div>
      </div>
    );
  }
}

export default App;
