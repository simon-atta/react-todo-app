import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link, BrowserRouter } from "react-router-dom";


import TodoList from "./component/todo-list.component";
import UpdateTodo from "./component/todo-update.component";
import AddTodo from "./component/todo-add.component";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">

                <Link to={"/todo"} className="nav-link">
                  Todos
                </Link>


              </li>
              <li className="nav-item">

                <Link to={"/add"} className="nav-link">
                  Add
                </Link>

              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/todo"]} component={TodoList} />
              <Route exact path={"/add"} component={AddTodo} />
              <Route path={"/todo/:id"} component={UpdateTodo} />
            </Switch>
          </div>

        </div>
      </BrowserRouter>
    );
  }
}

export default App;
