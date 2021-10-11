import React, { Component } from "react";
import TodoDataService from "../service/todo.service";
import { Link, BrowserRouter } from "react-router-dom";
import UpdateTodo from "./todo-update.component";

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTodo = this.setActiveTodo.bind(this);
    this.removeAllTodo = this.removeAllTodo.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      todos: [],
      currentTodo: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTodos();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveTodos() {
    TodoDataService.getAll()
      .then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveTodos();
    this.setState({
      currentTutorial: null,
      currentIndex: -1
    });
  }

  setActiveTodo(todo, index) {
    this.setState({
      currentTodo: todo,
      currentIndex: index
    });
  }

  removeAllTodo() {
    TodoDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentTodo: null,
      currentIndex: -1
    });

    TodoDataService.findByName(this.state.searchTitle)
      .then(response => {
        this.setState({
          todos: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, todos, currentTodo, currentIndex } = this.state;

    return (

        <div className="list row">


          {/* Search */}
          <div className="col-md-8">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={this.onChangeSearchTitle}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={this.searchTitle}
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="col-md-6">
            <h4>Tutorials List</h4>

            <ul className="list-group">
              {todos && todos.map((todo, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveTodo(todo, index)}
                  key={index}
                >
                  {todo.name}
                </li>
              ))}
            </ul>

            <button
              className="m-3 btn btn-sm btn-danger"
              onClick={this.removeAllTodo}
            >
              Remove All
            </button>
          </div>

          {/* Details */}

          <div className="col-md-6">
            {currentTodo ? (
              <div>
                <h4>Tutorial</h4>
                <div>
                  <label>
                    <strong>Name:</strong>
                  </label>{" "}
                  {currentTodo.name}
                </div>
                <div>
                  <label>
                    <strong>Status:</strong>
                  </label>{" "}
                  {currentTodo.status}
                </div>
                <div>
                  <Link to={"/todo/" + currentTodo.id} className="badge badge-warning">
                    Edit
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <br />
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>

        </div>

    );
  }
}
