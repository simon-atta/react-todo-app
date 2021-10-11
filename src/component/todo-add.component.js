import React, { Component } from "react";
import TodoDataService from "../service/todo.service";

export default class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.saveTodo = this.saveTodo.bind(this);
    this.newTodo = this.newTodo.bind(this);

    this.state = {
      id: null,
      name: "",
      status: ""
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  saveTodo() {
    let data = {
      name: this.state.name,
      status: this.state.status
    };

    TodoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          status: response.data.status
        });
        this.props.history.push("/todo");
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTodo() {
    this.setState({
      id: null,
      name: "",
      status: ""
    });
  }

  render() {
    return (
      <div className="submit-form">

        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={this.state.name}
              onChange={this.onChangeName}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={this.state.status}
              onChange={this.onChangeStatus}
              name="status"
            />
          </div>

          <button onClick={this.saveTodo} className="btn btn-success">
            Submit
          </button>
        </div>

      </div>
    );
  }
}
