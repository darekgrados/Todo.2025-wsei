import { TodoComponent, putLog } from "./components/todo";

putLog('Loguję coś...');

const appEl = document.getElementById('app');

const todo = new TodoComponent();

const todoWrapper = document.createElement('div');

todoWrapper.setAttribute('id', 'my-list');

appEl?.appendChild(todoWrapper);

todo.mount(todoWrapper)

// setInterval(() => {
//   todo.addItem(`Dodane później ${new Date().getTime()}`);
// }, 1000);

// const todo1 = new TodoComponent();

// todo1.mount(document.getElementById("todo-1"));
