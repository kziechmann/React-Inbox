import React, { Component } from 'react';
import Message from './Message';

class Messages extends Component {
  render() {
    return (
      <div>
        {this.props.messages? this.props.messages.map(message=><Message message={message}/>):""}
      </div>
    );
  }
}

export default Messages;
