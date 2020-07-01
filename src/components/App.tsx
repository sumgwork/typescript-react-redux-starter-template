import React from "react";
import { connect } from "react-redux";
import { fetchTodos, Todo, deleteTodo } from "../actions/todos";
import { StoreState } from "../reducers";

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: Function;
}

interface AppState {
  loading: boolean;
}

class _App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { loading: false };
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ loading: true });
  };

  onTodoClick = (id: number): void => {
    this.props.deleteTodo(id);
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todo: Todo) => {
      return (
        <div onClick={() => this.onTodoClick(todo.id)} key={todo.id}>
          {todo.title}
        </div>
      );
    });
  }

  componentDidUpdate(prevProps: AppProps) {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.onButtonClick}>Fetch</button>
        {this.state.loading ? "Loading" : this.renderList()}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState): { todos: Todo[] } => ({
  todos: state.todos,
});

export const App = connect(mapStateToProps, { fetchTodos, deleteTodo })(_App);
