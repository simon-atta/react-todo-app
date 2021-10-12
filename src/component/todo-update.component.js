import React, { Component } from "react";
import TodoDataService from "../service/todo.service";

export default class UpdateTodo extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.getTodo = this.getTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);

    this.state = {
      currentTodo: {
        id: null,
        name: "",
        status: ""
      }
    };
  }

  componentDidMount() {
    this.getTodo(this.props.match.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentTodo: {
          ...prevState.currentTodo,
          name: name
        }
      };
    });
  }

  onChangeStatus(e) {
    const status = e.target.value;

    this.setState(prevState => ({
      currentTodo: {
        ...prevState.currentTodo,
        status: status
      }
    }));
  }

  getTodo(id) {
    TodoDataService.findById(id)
      .then(response => {
        this.setState({
          currentTodo: response.data.pop(0)
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateTodo() {
    TodoDataService.update(
      this.state.currentTodo
    )
      .then(response => {
        console.log(response.data);
        this.props.history.push("/todo");
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteTodo() {
    TodoDataService.delete(this.state.currentTodo.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push("/todo");
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentTodo } = this.state;

    return (
      <div>
        {currentTodo ? (
          <div className="edit-form">
            <h4>TODO Details</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={this.state.currentTodo.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Status">Status</label>
                <input
                  type="text"
                  className="form-control"
                  id="status"
                  value={currentTodo.status}
                  onChange={this.onChangeStatus}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteTodo}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTodo}
            >
              Update
            </button>

          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    );
  }
}
