import React from "react";

class Todo extends React.Component {
  timer = 0;
  preventSimpleClick = false;
  constructor() {
    super();

    this.state = {
      newTodo: "",
      todoList: [],
      editId: null,
    };
  }

  handleChange = (e) => {
    this.setState({
      newTodo: e.target.value,
    });
  };


  handleEnter = (e) => {
    if (e.key !== "Enter") return;
    if(!this.state.editId) {
        this.setState({
            todoList: [...this.state.todoList, this.state.newTodo],
            newTodo: "",
          });
    }else {
        this.setState({
            todoList: this.state.todoList.map((item,i) => {
                if(i === this.state.editId) {
                    return this.state.newTodo
                }
                return item
            }),
            editId : null,
            newTodo: ""
        })
    }
  };


  handleEdit = (i) => {
    this.preventSimpleClick = true;
    clearTimeout(this.timer);

    const findItem = this.state.todoList.find(
      (item, index) => index === i && item !== this.state.newTodo && item
    );
    if (findItem) {
      this.setState({
        newTodo: findItem,
        editId: i,
      });
    }
    document.getElementById("text").focus();
  };


  handleDelete = (i) => {
    this.timer = 0;
    this.preventSimpleClick = false;
    let delay = 200;

    this.timer = setTimeout(() => {
      if (!this.preventSimpleClick) {
        const deleteFilter = this.state.todoList.filter(
          (item, index) => index !== i && item
        );
        if (deleteFilter) {
          this.setState({
            todoList: deleteFilter,
          });
        }
      }
    }, delay);
  };

  render() {
    return (
      <div>
        <div>
          <div>
            {/* Todo text */}
            <h1>Todo List</h1>
          </div>
          <div>
            {/* Todo Input */}
            <div>
              <input
                type="text"
                value={this.state.newTodo}
                placeholder="Write your todo"
                onChange={this.handleChange}
                onKeyUp={(e) =>this.handleEnter(e)}
                id="text"
              />
            </div>
          </div>
          <div>
            {/* Todo List */}
            <ul>
              {this.state.todoList?.map((item, i) => {
                return (
                  <li
                    key={`${item}${i}`}
                    onClick={() => this.handleDelete(i)}
                    onDoubleClick={() => this.handleEdit(i)}
                    className="cursor-pointer"
                  >
                    {item}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Todo;
