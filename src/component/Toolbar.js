import React, { Component } from 'react';

class Toolbar extends Component {

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.messages? this.props.messages.filter((message)=> !message.read).length : ''}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={this.props.anyChecked()? this.props.unSelectAll : this.props.selectAll }>
            <i className={this.props.anyChecked()? this.props.allChecked()? "fa fa-check-square-o" : "fa fa-minus-square-o" : "fa-check-square-o" }
            ></i>
          </button>

          <button className="btn btn-default" onClick={this.props.readAll} disabled={this.props.anyChecked()? "":"disabled"}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.unReadAll} disabled={this.props.anyChecked()? "":"disabled"}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={this.props.anyChecked()? "":"disabled"} value="Apply Label">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.props.anyChecked()? "":"disabled"} value="Remove Label">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" disabled={this.props.anyChecked()? "":"disabled"}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>

    );
  }
}

export default Toolbar;
