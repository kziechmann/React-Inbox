import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.messages? this.props.messages.map(message=><Message message={message} read={this.props.read} checked={this.props.checked} key={message.id} starred={this.props.starred}/>):""}
      </div>
    );
  }
}

export default Messages;
