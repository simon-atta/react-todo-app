import React, { Component } from "react";
import TodoDataService from "../service/todo.service";


export default class TodoList extends Component {
  constructor(props) {
    super(props);

    this.retrieveTodos = this.retrieveTodos.bind(this);
    this.setActiveTodos = this.setActiveTodos.bind(this);

    this.state = {
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveTodos();
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

  setActiveTodos(todo, index) {
    alert("Current TODO is : " + todo.name);
    this.setState({
      currentTutorial: todo,
      currentIndex: index
    });
  }



  render() {
    const { todos } = this.state;

    return (
      <div className="col-md-12 list">

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {todos && todos.map((todo, index) => (
              <tr onClick={() => this.setActiveTodos(todo, index)} key={index}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.status}</td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}
