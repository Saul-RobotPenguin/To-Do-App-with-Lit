import { LitElement, css, html } from "lit";

const author = "Saul.C";
const homepage = "https://www.saul-calleja.com/";
const footerTemplate = html`
  <footer>Made with love by <a href="${homepage}">${author}</a></footer>
`;

export class TodoApp extends LitElement {
  static styles = css`
    html,
    body {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      background-color: #ededed;
    }
    .centered {
      position: fixed;
      top: 50%;
      left: 50%;
      /* bring your own prefixes */
      transform: translate(-50%, -70%);
    }
  `;
  static properties = {
    todos: { type: Array },
  };

  constructor() {
    super();
    this.todos = [
      { text: "Clean Dishes", finished: true },
      { text: "Drop off kids", finished: false },
      { text: "File for bankrupcy", finished: false },
    ];
  }

  render() {
    return html`
      <div class="centered">
        <h1>Todo app</h1>

        <input id="addTodoInput" placeholder="Name" />
        <button @click=${this._addTodo}>Add</button>

        <ol>
          ${this.todos.map(
            (todo) => html`
              <li>
                <input
                  type="checkbox"
                  .checked=${todo.finished}
                  @change=${(e) => this._changeTodoFinished(e, todo)}
                />
                ${todo.text}
                <button @click=${() => this._removeTodo(todo)}>X</button>
              </li>
            `
          )}
        </ol>

        ${footerTemplate}
      </div>
    `;
  }

  _addTodo() {
    const input = this.shadowRoot.getElementById("addTodoInput");
    const text = input.value;
    input.value = "";

    this.todos = [...this.todos, { text, finished: false }];
  }

  _removeTodo(todo) {
    this.todos = this.todos.filter((e) => e !== todo);
  }

  _changeTodoFinished(e, changedTodo) {
    const finished = e.target.checked;

    this.todos = this.todos.map((todo) => {
      if (todo !== changedTodo) {
        return todo;
      }
      return { ...changedTodo, finished };
    });
  }
}

customElements.define("todo-app", TodoApp);
